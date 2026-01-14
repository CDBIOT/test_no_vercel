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
const client  = mqtt.connect('mqtt://broker.mqtt-dashboard.com:8883', options)

client.on('connect', function () {
  console.log('Connected on mqtt broker topic room_temp')
  
  client.subscribe('room_temp', function (err) {

    console.log('Subscribe to topic Room_temp via mqtt')
    if (!err) {
      //client.publish('room_light', '1')
    }
  })
 // client.end()

})

client.on('message', function (topic, message) {
  // message is Buffer
  const m = message.toString();
  console.log(message.toString())
 // client.end()
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
          res.status(201).json({message: "Temperatura recebida"})
          }catch(error){
          res.status(500).json({error: error})
      }  
  })
  
const getMqtt = (async (req, res) => {
  
client.on('message', function (topic, message) {
  // message is Buffer
  //const m = message.toString();
  console.log(message.toString())
  client.end()
})
    /*Render the index.hbs and pass the View Model*/
    var vm = {
        title: 'MQTT',
        message: [new Date()]
    }
    console.log(vm.message);
    //res.render('mqtt/index', vm);
});


module.exports = {
  mqtt,
  getMqtt,
  postPublished
}