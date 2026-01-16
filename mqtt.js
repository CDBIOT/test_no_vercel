const express = require('express');
const router = express.Router();
const mqtt = require('mqtt');
const { publishMessage } = require('./publisher');


const options = {
  // Clean session
  clean: true,
  connectTimeout: 1000,
  // Auth
  clientId: 'cdbiot123',
  username: 'test',
  password: 'test',
 reconnectPeriod: 1000,
}

//const client  = mqtt.connect('mqtt://broker.mqtt-dashboard.com:1883', options)

//const client  = mqtt.connect('wss://broker.mqtt-dashboard.com:8884/mqtt', options)

function conect() {

//const client = (mqtt.connect(connectUrl,options))

const client  = mqtt.connect('wss://broker.mqtt-dashboard.com:8884/mqtt', options)

try{
    client.on('connect', () => {
    
      console.log('Connected to MQTT broker via mqttjs')
    })
   }catch (error){console.log('mqtt.connect error',error)}
   
try{
    client.subscribe(topic, () => {
      console.log("Subscribe to topic mqttjs:", + topic)
    }) }catch(error){console.error(error)}
    
    client.stream.on('error', (err) => {
      console.error(`Connection failed: ${err.message}`);
      client.end();
    });
    
    client.on('message', (topic, payload) => {
         temp = payload
         local= topic
         console.log('Received Message:',+ messages + payload.toString(),"From:", + topic)
         console.log('Received Message:',+ messages + payload)
        res.status(200).json({m})
     })
}

client.subscribe('room_temp', function (err) {
    console.log('Subscribe to topic Room_temp via mqttjs')
         //temp = payload
         //local= topic
         console.log('Received Message:',+ messages + payload.toString(),"From:", + topic)
         console.log('Received Message:',+ messages + payload)
        res.status(200).json({m})

     if (!err) {
        console.log('ERRO ao connectar mqtt')
     }
   })

// client.on('message', function (topic, message) {
//   // message is Buffer
//   const m = message.toString();
//   console.log(m.toString())

//       temp = payload.toString(),
//       local= topic2
//       message=message
//       console.log('Received Message:'+message.toString(), topic, payload.toString())
//  // client.end()
// })

//  //Page published
//  const postPublished=( async (req, res) =>{
//   const {message,payload } = req.body
//      // const temps = req.params
//   const mess = {message,payload}
//   const create_temp = new publishMessage(req.body);
//   //temps.save()
//       try{
//           await client.publish(mess)
//           //temps.save()
//           console.log(message,payload)
//           res.status(201).json({message: "Temperatura recebida"})
//           }catch(error){
//           res.status(500).json({error: error})
//             console.log('ERRO ao receber mensagem mqtt')
//       }  
//   })
  
// const mqtt = (async (req, res) => {
  
// client.on('message', function (topic, message) {
//   // message is Buffer
//   //const m = message.toString();
//   console.log(message.toString())
//   //client.end()
//  })
//     /*Render the index.hbs and pass the View Model*/
//     var vm = {
//         title: 'MQTT',
//         message: [new Date()]
//     }
//     console.log(vm.message);
//     //res.render('mqtt/index', vm);
// });


module.exports = {
  //mqtt,
  conect,
  
 // postPublished
}