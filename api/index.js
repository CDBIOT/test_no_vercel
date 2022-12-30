
import { Router } from 'express';
import express from 'express';
const app = express();

const route = Router();


//Read
route.get('/', (req, res) =>{
        res.json({
            sucess: true,
            message: "Sucesso"
        })
})


app.use (route)

const PORT = 4000 ;
    app.listen(PORT,function(){
        console.log("Servidor Rodando" + PORT);
        })

