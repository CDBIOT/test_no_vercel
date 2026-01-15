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

//const client  = mqtt.connect('mqtt://broker.mqtt-dashboard.com:1883', options)

const client  = mqtt.connect('wss://broker.mqtt-dashboard.com:8884', options)

 const conect = async (req, res) => {
  try {
    //const client = mqtt.connect(process.env.MQTT_URL);
    
//const client  = mqtt.connect('wss://broker.mqtt-dashboard.com:8884', options)
//const client  = mqtt.connect('mqtt://broker.mqtt-dashboard.com:1883', options)

    client.on("connect", () => {
      console.log("MQTT conectado");
      client.subscribe("room_temp");
    });

    client.on("message", (topic, message) => {
      const payload = JSON.parse(message.toString());

      console.log("MQTT:", payload);

      res.status(200).json({
        vm: {
          temp: payload.temp,
          local: "room_temp",
          dia: new Date().getDate(),
          mes: new Date().getMonth() + 1,
          ano: new Date().getFullYear()
        }
      });

      client.end(); // fecha MQTT após responder
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "MQTT error" });
  }
};

client.on("error",(err)=> {
    console.log("Error: ",err);
    client.end();
})


  client.subscribe('room_temp', function (err) {
    console.log('Subscribe to topic Room_temp via mqtt')
    if (!err) {
      //client.publish('room_light', '1')
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