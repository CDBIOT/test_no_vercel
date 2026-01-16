const mqtt = require('mqtt');
const express = require('express');
const router = express.Router();

const topic1 = 'bh/inTopic'
const topic2 = 'room_light'
const topic3 = 'aqua_light'


const host = 'broker.mqtt-dashboard.com'
const protocol = "mqtt"
const port = '1883'

const options = {
  // Clean session
  clean: true,
  connectTimeout: 1000,
  protocolId: "MQTT",
  protocolVersion: 4,
  keepalive: 60,
  // Auth

  clientId: 'cdbiot123',
  username: 'test',
  password: 'test',
 reconnectPeriod: 1000,
}



function connectToBroker(){

const connectUrl  = mqtt.connect('wss://broker.mqtt-dashboard.com:8884/mqtt', options)

//const connectUrl = `mqtt://${host}:${port}`


const client = mqtt.connect(connectUrl,options)

client.on('connect', function () {
  
    console.log('Connected to Publish')
    
    client.subscribe("room_light", function (err) {
  
      console.log('Subscribe to topic ')
      if (!err) {
        client.publish("room_light", '0')
      }
    })
   // client.end()
  
  })

client.on("error",(err)=> {
    console.log("Error: ",err);
    client.end();
})

// client.on("reconnect", () => {
//     console.log("Reconnecting...");
// client.end()
// });


 }

function publishMessage(topic,message){
    console.log(`Sending Topic via publisher: ${topic}, Message: ${message}`);
    
//body: {"topic":'room_light',"message": '1'}
//body: JSON.stringify({"topic":'room_light',"message": '1'})
    //client.publish(topic,message,{qos: 0, retain: false});
    //client.end()
}

connectToBroker();
publishMessage("room_light","0");  

module.exports = {
    connectToBroker,
    publishMessage,
    mqtt
}