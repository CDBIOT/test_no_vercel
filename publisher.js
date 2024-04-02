const mqtt = require('mqtt');
const express = require('express');
const router = express.Router();

var client

const topic1 = 'bh/inTopic'
const topic2 = 'room_light'
const topic3 = 'aqua_light'


const host = 'broker.mqtt-dashboard.com'
const protocol = "mqtt"
const port = '1883'

function connectToBroker(){

const connectUrl = `mqtt://${host}:${port}`

const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000,
  protocolId: "MQTT",
  protocolVersion: 4,
  keepalive: 60,
  // Auth

  clientId: 'cdbiot123',
  username: 'test',
  password: 'test',
 reconnectPeriod: 1000,
}

const client = mqtt.connect(connectUrl,options)

client.on('connect', function () {
    console.log('Connected to Publish')
    
    client.subscribe(topic2, function (err) {
  
      console.log('Subscribe to topic ')
      if (!err) {
        client.publish(topic2, '1')
      }
    })
    client.end()
  
  })

client.on("error",(err)=> {
    console.log("Error: ",err);
    client.end();
})

client.on("reconnect", () => {
    console.log("Reconnecting...");
client.end()
});

client.on('connect', () => {
  console.log('Connected:' + options.clientId)
  client.end()
})

 }

function publishMessage(topic,message){
    console.log(`Sending Topic via publishMessage: ${topic}, Message: ${message}`);
    //client.publish(topic,message,{qos: 0, retain: false});
    //client.end()
}

connectToBroker();
publishMessage("topic2",1);

module.exports = {
    connectToBroker,
    publishMessage,
    mqtt
}