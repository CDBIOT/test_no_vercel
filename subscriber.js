const mqtt = require('mqtt');
const express = require('express');
const router = express.Router();


const topic1 = 'Sala'
const topic2 = 'Lamp'
const topic3 = 'Aqua'

const host = 'broker.mqtt-dashboard.com'
const port = '1883'

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

const client = mqtt.connect(connectUrl,options)

function connectToBroker(){

client.on("error",(err)=> {
    console.log("Error: ",err);
    client.end();
})

client.on("reconnect", () => {
    console.log("Reconnecting...");
});

client.on('connect', () => {
  console.log('Connected:' + options.clientId)
})

client.on('message', (topic,message, payload) => {
      temp = payload
      local= topic
      message=message
      console.log('Received Message:'+message.toString(), topic, payload.toString())
    })
}
// setInterval(() => {
// client.on('message', (topic, payload) => {
//   temp = payload.toString()
//   console.log('Received Message:', topic, temp)
///})
  
//}, 1000);

function subscribeToTopic(topic,message){
    console.log(`Subscribing to Topic: ${topic}`);
    client.subscribe(topic,message,{qos: 0});
}

connectToBroker();
subscribeToTopic("topic1","Olá");

module.exports = {
    connectToBroker,
    subscribeToTopic,
  mqtt
}