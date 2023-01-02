
import { Router } from 'express';
import express from 'express';
const app = express();

const Temps = require('./temps')

const route = Router();


//Read
route.get('/', (req, res) =>{
        res.json({
            sucess: true,
            message: "Sucesso"
        })
})


//Read
route.get('/temps', async (req, res) =>{
    try{
       const temps = await Temps.find()
        res.status(200).json({temps})
    }catch(error){
        res.status(500).json({error: error})
    }  
})


app.use (route)

    app.listen(4000,()=>{
        console.log("Servidor Rodando" + 4000);
        })

