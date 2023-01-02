

const express = require('express');
const app = express();
const route = express.Router();
const Temps = require('../temps')



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

const port = process.env.PORT || 4000;
app.use (route)

    app.listen(port,()=>{
        console.log("Servidor Rodando" + `${port}`);
        })

