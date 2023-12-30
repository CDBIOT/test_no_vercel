const mqtt2 = require('mqtt');
const express = require('express');
const router = express.Router();
const host = 'broker.mqtt-dashboard.com'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`
const client = mqtt2.connect(connectUrl, {
  clientId: "cdbiot123",
  clean: true,
  connectTimeout: 4000,
  username: 'test',
  password: 'test',
  reconnectPeriod: 1000,
})

const topic = 'Sala'
client.on('connect', () => {
  console.log('Connected on mqtt broker')
  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`)

client.on('message', (topic, payload) => {
      temp = payload
      local= topic
      console.log('Received Message test_no_vercel:', topic, payload.toString())
      client.publish('bh/inTopic', '0')
     //res.status(200).json({m})
    client.end()
    })
  })
 })
// setInterval(() => {
// client.on('message', (topic, payload) => {
//   temp = payload.toString()
//   console.log('Received Message:', topic, temp)
//   client.end()
  //res.status(200).json({m})
///})
  
//}, 1000);


module.exports = {
  mqtt2
}