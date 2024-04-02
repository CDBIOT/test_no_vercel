const mqtt = require('mqtt');
const express = require('express');
const router = express.Router();

const { publishMessage } = require('./publisher');

const host = 'broker.mqtt-dashboard.com'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`
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
  console.log('Connected on mqtt broker topic room_light')
  
  client.subscribe('room_light', function (err) {

    console.log('Subscribe to topic Room_light via mqtt')
    if (!err) {
      client.publish('room_light', '0')
    }
  })
  client.end()

})

client.on('message', function (topic, message) {
  // message is Buffer
  const m = message.toString();
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

module.exports = {
  mqtt
}