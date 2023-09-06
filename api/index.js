const express = require ('express');
const app = express();
const user = require('../rotas_user');
const temps = require('../rotas_temps');
const mqtt = require('../mqtt')
const Temps = require('../temps')
const mqtt2 = require('../mqtt_node2');
const cors = require('cors')
require('dotenv').config()

app.use(cors());

app.use((req,res,next) => {
    console.log("Cors habilitado");
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Header",'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        res.status(200).send({})
    }
next()
   })
//Read
app.get('/', (req, res) =>{
        res.json({
            sucess: true,
            message: "Sucesso na conexão servidor de Temperaturas"
        })
})

app.use('/user',user)

app.use('/temps',temps)


app.get('/mqtt',(req, res) =>{
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

app.use('/mqtt_node2.js', express.static("/"))


app.get("/mqtt",function(req,res){
    res.sendFile(__dirname + "/mqtt_node2.js");
 });
    
const port = process.env.PORT || 4000;

    app.listen(port,()=>{
        console.log("Servidor Rodando" + `${port}`);
        })

