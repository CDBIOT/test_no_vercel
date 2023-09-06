
const express = require('express');
const routers = express.Router();
const Person = require('./user')
var fs = require('fs');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


//Read
routers.get('/user', async (req, res) =>{
    try{
       const people = await Person.find()
        res.status(200).json({people})
    }catch(error){
        res.status(500).json({error: error})
    }  
})

//Read 
routers.get('/user',checkToken, async (req, res) =>{

    try{
        const people = await Person.find()
        return res.status(422).json({people})
    }catch(error){
        res.status(500).json({error: error})
    }  
})


 //Create
 routers.post('/user', async (req, res) =>{
    const {nome, email, senha } = req.body
    const person = { nome,email,senha }
    try{
        await Person.create(person)
        res.status(201).json({message: "Pessoa inserida com sucesso"})
    }catch(error){
        res.status(500).json({error: error})
    }  
})
//Cadastrar
routers.post('/cadastrar', async (req, res) =>{

    const senha= await bcrypt.hash("123456", 8);
    console.log(senha);
    return res.json({
            erro: false,
            message:  'Usuário cadastrado com sucesso'
        });
})

//Login
routers.post('/login', async (req, res) =>{
    try{
       const people = await Person.findOne({
        attributes: ['nome', 'email', 'senha']

    })
        //res.status(200).json({people})
        res.status(422).json({message:  'Usuário encontrado'});
    }catch(error){
        res.status(500).json({error: error})
        res.status(422).json({message:  'Usuário não encontrado'});
    }  
})


 //Delete usuario
 routers.delete('/user/:id', async (req, res) => {
    const id = req.params.id
    const person = await Person.findById(id)
    if(!person){
    res.status(422).json({message:  'Usuário não encontrado'});

    return
    }
    try{
        await Person.deleteOne(person);
        res.status(200).json({message: 'Usuário removido com sucesso'});
    
    }catch(error){
    res.status(500).json({error: error})
    console.log(id);
}  

});

//  //Delete
//  routers.delete('/user/:id', async (req, res) => {
//     const id= req.params.id
//     const person = await Person.findOne({_id: id})
//     if(!person){
//     res.status(422).json({message:  'Usuário não encontrado'});
//     console.log('usuario não encontrado')
//     return
//     }
//     try{
//         await Person.deleteOne({_id: id});
//         res.status(200).json({message: 'Usuário removido com sucesso'});
//         console.log('usuario removido')
//     }catch(error){
//     res.status(500).json({error: error})
//     console.log('usuario não removido')
// }  
// });

//Update
routers.patch('/user/:id',async (req, res) =>{
    const id = req.params.id
    const {nome,sobrenome,idade} = req.body
    const person = {nome,email,senha,}
    try{
     const updatePerson = await Person.updateOne({_id: id},person);
     res.status(200).json(person);
    }catch(error){
    res.status(500).json({error: error})
}  
})



//Login com senha criptografada
routers.post('/login', async (req, res) =>{
    const {nome, senha0} = req.body
   // $2a$08$VaEBCrDE50.Sy56I7nuUkeKr0HLt2W2.mQZbvtmMCte6Jq4Iw.6oe
   if(!nome){
    return res.status(422).json({message: 'O nome é obrigatório'})
    }
    if(!senha0){
    return res.status(422).json({message: 'A senha é obrigatória'})
    }
    //check if user exists
    const senha = senha0;

    const user = await Person.findOne({ nome: nome})

    if(!user){
    return res.status(404).json({error:  'Usuário não encontrado'})
    }
     //check if password match
     const checkpass = await bcrypt.compare(senha0, user.senha)

    if(!checkpass){
    return res.status(422).json({error: 'Senha inválida'})
   }

    try{
    const secret = process.env.SECRET
    // gera token com informação de id do usuario + secret
    const token = jwt.sign ({id: user._id}, secret)
    const id  = user._id


    res.cookie('token',token,{maxAge: 60000, httpOnly: false});

    res.cookie('didox','texto1',{maxAge: 60000, httpOnly: false});

	//window.localStorage.setItem =("token",token);
    req.session.token = token;
    console.log(req.session)

     res.status(200).json({message: 'Usuário autenticado com sucesso', token,user})
        res.user;
     }catch(error){
        console.log(error)
          res.status(500).json({error: "Aconteceu um erro no servidor!",token})
     }
})

//Funcão check token
function checkToken (req, res, next) {

const authHeader = req.headers.authorization || req.body.token ||req.query.token;

//const token = authHeader && authHeader.split(' ')[1];
//const [Bearer ,token] = authHeader.split(' ')[1];

const token = req.cookies.token
//const token = req.session.token
const didox = req.cookies.didox
const {cookies}=req;

console.log(req.cookies.didox)
console.log(req.cookies.token)

console.log("token:", token)
console.log("autHeader: ",authHeader)

if(!authHeader){
 return res.status(401).json({message: "Token incorreto"})
}
   try {
    
   const secret = process.env.SECRET
   jwt.verify(token,secret,(err,decoded)=> {
    if(err){ res.status(401).json({ message: "Token errado" });
    req.userID = decoded.userId;
    }else{

    next();
    }
   })}catch (error) {
    res.status(401).json({msg: "Token Invalido!"})
   }
   
}

//Cadastrar usuario com senha criptografada 
routers.post('/cadastrar', async (req, res) =>{

    const {nome, email, senha0} = req.body
    
   if(!nome){
    return res.status(422).json({message: 'O nome é obrigatório'})
    }
    if(!email){
    return res.status(422).json({message: 'O email é obrigatório'})
    }
    if(!senha0){
    return res.status(422).json({message: 'A senha é obrigatória'})
    }
    
    const salt = await bcrypt.genSalt(12)
        
    const senha= await bcrypt.hash(senha0, salt);

    const person = { nome, email, senha }

    try{
        await Person.create(person)
        res.status(201).json({message: 'Usuário cadastrado com sucesso'})

    }catch(error){
        res.status(500).json({error: error})
    }  
    console.log(senha);
})




routers.use('/', express.static(__dirname + '/'))
routers.use('/css', express.static("/css"))
routers.use('/imagens', express.static("/imagens"))
routers.use('/user.js', express.static("/"))
routers.use('/rotas_user.js', express.static("/"))

 
 routers.get("/cad_user",function(req,res){
    res.sendFile(__dirname + "/cad_user.html");
});

 routers.get("/user.js",function(req,res){
     res.sendFile(__dirname + "/user.js");
 });

module.exports = routers