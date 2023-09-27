
const mongoose = require('mongoose')
require('dotenv').config()

//Configuração do mongoose
const MONGODB_URI = 'mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@cluster0.mvho6.mongodb.net/'
+process.env.DB_NAME+'?retryWrites=true&w=majority'
mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
    }).then(() => {
    
    console.log("MongodB temperatura conectado com sucesso!")
})
.catch((err) => {
    console.log("Houve um erro ao se conectar ao mongodB temperaturas: " +err)
})


