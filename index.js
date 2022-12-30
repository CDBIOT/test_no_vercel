const express = require('express');
const app = express();
require('dotenv').config()

const db_atlas = require('./db_atlas')
const cors = require('cors')

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
app.use(cookieParser())
app.use(session({secret: '123456' , token: 'token'}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.json());

app.use(routers);

//Read
app.get('/', async (req, res) =>{
     
    res.status(201).send({
        mensagem: 'inserido',
        produtoCriado: produto
        })
})


const PORT = process.env.PORT || 4000 || 5500;
    app.listen(PORT,function(){
        console.log("Servidor Rodando" + 4000);
        })

