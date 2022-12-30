
const { Router } = 'express';
import express from 'express';
const app = express();


//Read
app.get('/', async (req, res) =>{
    try{
        await Person.create(person)
        res.status(201).json({message: "Pessoa inserida com sucesso"})
    }catch(error){
        res.status(500).json({message: "Error no Status"})
    }  
})


const PORT = process.env.PORT || 4000 || 5500;
    app.listen(PORT,function(){
        console.log("Servidor Rodando" + 4000);
        })

