const { response } = require('express');
const express = require('express');
const routers = express.Router();
const Temps = require('./temps')
var fs = require('fs');
//app.use(mqtt);

 const getMqtt=((req, res) =>{
    try{ 
        date = new Date() 
        var vm = {
            temp: temp,
            local: local,
            dia: date.getDate(),   
            mes: date.getMonth() + 1,
            ano: date.getFullYear()
        }
        console.log(vm);
        //res.send(vm);
        res.status(200).json({vm})
     }catch(error){
         res.status(500).json(error)
     }  
    })
    
 //Create temps
const postTemps=( async (req, res) =>{
const {local, temperatura, dia, mes, ano } = req.body
   // const temps = req.params
const temps = {local,temperatura, dia, mes, ano}
const create_temp = new Temps(req.body);
//temps.save()
    try{
        await Temps.create(temps)
        //temps.save()
        console.log(temps)
        res.status(201).json({message: "Temperatura inserida"})
        }catch(error){
        res.status(500).json({error: error})
    }  
})


//Read
const getTemps=( async (req, res) =>{
    try{
       const temps = await Temps.find()
        res.status(200).json({temps})
    }catch(error){
        res.status(500).json({error: error})
    }  
})

// //Read
// routers.get('/temps/:dia', async (req, res) =>{
//     const dia = req.params.dia
//     try{
//        const dias = await Temps.findAll({dia})
//         res.status(200).json({dias})
//     }catch(error){
//         res.status(500).json({error: error})
//     }  
// })

// //Update
// routers.patch('/temps/:id',async (req, res) =>{
//     const id = req.params.id
//     const {local, temperatura, dia, mes, ano } = req.body
//     const temps = {local, temperatura, dia, mes, ano}
//     try{
//      const updateTemp = await Temps.updateOne({id: id},temps);
//      res.status(200).json(temps);
//     }catch(error){
//     res.status(500).json({error: error})
//     }  
// })

// routers.post('/temps/:id',async(req, res) =>{
//     const  id = req.params.id
    
//     res.status(201).send({
//     mensagem: 'inserido',
//     produtoCriado: produto
//     })
//   });

 //Delete
const deleteTemp = (async (req, res) => {
    const id= req.params.id
    //temps.remove({id: req.body.id})
    const temps = await Temps.deleteOne({ _id: id}, (err) => {
    
    if(err) return res.status(400).json({

        error:true,
        message: "Error: Artigo não foi apagado com sucesso!"
    });
   // if(!temps){
   // res.status(422).json({message:  'Temperatura não encontrada'});
    //res.redirect('/temps')
    return res.json({

        error: false,
        message: "Artigo apagado com sucesso!"
            })
        })
    })

   // try{
    //    await Temps.deleteOne({"_id": id});
    //    res.status(200).json({message: 'Temperatura removida com sucesso'});
        //res.redirect('/temps')
   // }catch(error){
  //  res.status(500).json({error: error})
//}  
//});




//Read user private page
// routers.get('/user', async (req, res) =>{
//     const id= req.params.id
//     try{
//        const people = await Person.findById(id, '-senha')
//         res.status(200).json({people})
//         console.log(req.user._id + 'fez esta chamada')
//     }catch(error){
//         res.status(500).json({error: error})
//     }  
// })

routers.use('/', express.static(__dirname + '/'))
routers.use('/css', express.static("/css"))
routers.use('/imagens', express.static("/imagens"))
routers.use('/grafico.js', express.static("/"))
routers.use('/mqtt_node2.js', express.static("/"))


 routers.get("/mqtt_node2",function(req,res){
    res.sendFile(__dirname + "/mqtt_node2.js");
});

routers.get("/mqtt.html",function(req,res){
    res.sendFile(__dirname + "/mqtt.html");
});
 
 routers.get("/Grafico",function(req,res){
     res.sendFile(__dirname + "/Grafico.html");
 });
 
 routers.get("/grafico",function(req,res){
     res.sendFile(__dirname + "/grafico.js");
 });
 
 routers.get("/admin",function(req,res){
    res.sendFile(__dirname + "/admin.html");
});


module.exports = {
        getTemps,
        getMqtt,
        postTemps,
        deleteTemp
    
    }