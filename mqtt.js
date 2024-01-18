const express = require('express');
const router = express.Router();
const mqtt = require('mqtt');
const { publishMessage } = require('./publisher');

const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000,
  // Auth
  clientId: 'cdbiot123',
  username: 'test',
  password: 'test',
 reconnectPeriod: 1000,
}
const client  = mqtt.connect('mqtt://broker.mqtt-dashboard.com:1883', options)
client.on('connect', function () {
  console.log('Connected on mqtt broker topic Teste1')


  client.subscribe('Teste1', function (err) {

    console.log('Subscribe to topic Temp_sala')
    if (!err) {
      client.publish('bh/inTopic', '1')
    }
  })
  client.end()

})

client.on('message', function (topic, message) {
  // message is Buffer
  m = message.toString();
  console.log(message.toString())
  client.end()
})

 //Page published
 const postPublished=( async (req, res) =>{
  const {message,payload } = req.body
     // const temps = req.params
  const mess = {message,payload}
  const create_temp = new publishMessage(req.body);
  //temps.save()
      try{
          await client.publish(mess)
          //temps.save()
          console.log(message,payload)
          res.status(201).json({message: "Lâmpada Ligada"})
          }catch(error){
          res.status(500).json({error: error})
      }  
  })
  
router.get('/', function (req, res) {
    /*Render the index.hbs and pass the View Model*/
    var vm = {
        title: 'MQTT',
        message: [new Date(), m]
    }
    console.log(vm.message);
    res.render('mqtt/index', vm);
});

 



module.exports = mqtt;