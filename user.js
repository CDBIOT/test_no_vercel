const mongoose = require('mongoose')
const db = require('./mongoConect')
//Model User
//Definindo o model
//Tabela User
const Person = mongoose.model('Person',{
    nome: String  ,
    email: String,
    senha: String,
})


module.exports = Person