const express = require ('express');
const app = express();
const rotas_user = require('../rotas_user');
const rotas_temps = require('../rotas_temps');
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


app.get('/temps', rotas_temps.getTemps)
app.get('/mqtt',rotas_temps.getMqtt)
app.get('/mqtt2', rotas_temps.getMqtt2)
app.post('/temps', rotas_temps.postTemps)
app.delete('/temps',rotas_temps.deleteTemp)

routers.get('/mqtt_on', mqtt.onLight)

routers.get('/mqtt_off', mqtt.offLight)





app.get ('/user',rotas_user.getUser)
app.post('/user',rotas_user.postUser)
app.put('/user/:id',rotas_user.CadUser)
app.delete('/user/:id',rotas_user.deleteUser)


// app.use('/mqtt_node2.js', express.static("/"))

app.use('/', express.static(__dirname + '/'))
app.use('/css', express.static("/css"))
app.use('/imagens', express.static("/imagens"))
// app.use('/grafico.js', express.static("/"))

app.get("/index.html",function(req,res){
    res.sendFile(__dirname + "/index.html");
});

// app.get("/Grafico",function(req,res){
//     res.sendFile(__dirname + "/Grafico.html");
// });

// app.get("/grafico",function(req,res){
//     res.sendFile(__dirname + "/grafico.js");
// });

// app.get("/mqtt",function(req,res){
//     res.sendFile(__dirname + "/mqtt_node2.js");
//  });
    
    
const port = process.env.PORT || 4000;

    app.listen(port,()=>{
        console.log("Servidor Rodando" + `${port}`);
        })

