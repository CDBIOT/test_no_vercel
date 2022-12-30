
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

    app.listen(4000,()=>{
        console.log("Servidor Rodando" + 4000);
        })

