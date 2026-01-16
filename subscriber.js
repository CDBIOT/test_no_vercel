const mqtt = require('mqtt');
const express = require('express');
const router = express.Router();

var client
const topic1 = 'bh/outTopic'
const topic2 = 'room_temp'
const topic3 = 'aqua_temp'

const host = 'broker.mqtt-dashboard.com'
const port = '1883'

const options = {
    // Clean session
    keepalive: 60,
    clean: true,
    connectTimeout: 3000,
    // Auth
    clientId: 'cdbiot123',
    username: 'test',
    password: 'test',
   reconnectPeriod: 1000,
  }


function connectToBroker(){

const connectUrl  = mqtt.connect('wss://broker.mqtt-dashboard.com:8884/mqtt', options)

// const connectUrl = `mqtt://${host}:${port}`

const client = mqtt.connect(connectUrl,options)

client.on('connect', function () {
  console.log('Connected to Subscriber')
  
  // client.subscribe("room_temp", function (err) {

  //   console.log('Subscribe to room_temp')
  //   if (!err) {
  //    // client.publish("room_light", '0')
  //   }
  // })
  // //client.end()

})

client.subscribe("room_light", function (err) {

    console.log('Subscribe to room_light')
    if (!err) {
      client.publish("room_light", '0')
      //body: {"topic":'room_light',"message": '0'}
    }
})
client.subscribe("room_temp", function (err) {

    console.log('Subscribe to room_temp')
    if (!err) {
   
    }
})
  //client.end()

client.on("error",(err)=> {
    console.log("Error: ",err);
    client.end();
})

// client.on("reconnect", () => {
//     console.log("Reconnecting...");
// });

client.on('message', (topic,message, payload) => {
      temp = payload.toString(),
      local= topic2
      message=message
      console.log('Received Message:'+message.toString(), topic, payload.toString())
     // client.end();
    })
}

function publishMessage(topic,message){
  console.log(`Sending Topic via publishMessage: ${topic}, Message: ${message}`);
  //client.publish(topic,message,{qos: 0, retain: false});
  //client.end()
}
function subscribeToTopic(topic2,message){
    console.log(`Subscribing to Topic via subscribe function in: ${topic2}`);
    client.subscribe(topic2,message,{qos: 0});
    //client.end()
}

connectToBroker();
//subscribeToTopic("room_light","0");

publishMessage("room_light","1");


module.exports = {
    connectToBroker,
    subscribeToTopic,
  mqtt
}