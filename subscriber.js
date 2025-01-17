const mqtt = require('mqtt');
const express = require('express');
const router = express.Router();

var client
const topic1 = 'bh/outTopic'
const topic2 = 'room_temp'
const topic3 = 'aqua_temp'

const host = 'broker.mqtt-dashboard.com'
const port = '1883'



function connectToBroker(){

const connectUrl = `mqtt://${host}:${port}`
const options = {
    // Clean session
    keepalive: 60,
    clean: true,
    connectTimeout: 3000,
    keepalive: 60,
    // Auth
    clientId: 'cdbiot123',
    username: 'test',
    password: 'test',
   reconnectPeriod: 1000,
  }

const client = mqtt.connect(connectUrl,options)

client.on('connect', function () {
  console.log('Connected to Subscriber')
  
  client.subscribe("room_light", function (err) {

    console.log('Subscribe to room_light')
    if (!err) {
      client.publish("room_light", '0')
    }
  })
  //client.end()

})

client.on("error",(err)=> {
    console.log("Error: ",err);
    client.end();
})

client.on("reconnect", () => {
    console.log("Reconnecting...");
});

client.on('connect', () => {
  console.log('Connected:' + options.clientId)
 // client.end();
})

client.on('message', (topic,message, payload) => {
      temp = payload
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
    //client.subscribe(topic,message,{qos: 0});
    //client.end()
}

connectToBroker();
subscribeToTopic("room_light","0");

publishMessage("room_light","0");


module.exports = {
    connectToBroker,
    subscribeToTopic,
  mqtt
}