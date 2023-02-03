const express = require('express');
const app = express();
const route = express.Router('../rotas_temps','../rotas_user');
const Temps = require('../temps')
const mqtt = require('mqtt');

//Read
route.get('/', (req, res) =>{
        res.json({
            sucess: true,
            message: "Sucesso na conexão"
        })
})

//Read
route.get('/temps', async (req, res) =>{
    try{
       const temps = await Temps.find()
        res.status(200).json({temps})
    }catch(error){
        res.status(500).json({ message: "No Sucess!"})
    }  
})


route.get('/mqtt',(req, res) =>{
    try{ 
        date = new Date() 
        var vm = {
            temp: mqtt.temp,
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

route.get('/mqtt_node',(req, res) =>{
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
 route.post('/temps', async (req, res) =>{
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
route.use('/mqtt_node2.js', express.static("/"))

route.get("/mqtt",function(req,res){
    res.sendFile(__dirname + "/mqtt.html");
});

route.get("/mqtt_node",function(req,res){
    res.sendFile(__dirname + "/mqtt_node.js");
 });
    
const port = process.env.PORT || 4000;
app.use (route)

    app.listen(port,()=>{
        console.log("Servidor Rodando" + `${port}`);
        })

