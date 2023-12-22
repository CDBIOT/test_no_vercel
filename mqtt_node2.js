const mqtt2 = require('mqtt');
const routers = require('./rotas_temps');

const host = 'broker.mqtt-dashboard.com'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`
const client = mqtt2.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'emqx',
  password: 'public',
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
      console.log('Received Message:', topic, payload.toString())
    //  res.status(200).json({m})
    })
  })
})
setInterval(() => {
client.on('message', (topic, payload) => {
  temp = payload.toString()
  console.log('Received Message:', topic, temp)
  client.end()
  //res.status(200).json({m})
})
  
}, 1000);

// const topic3 = 'Quarto'
// client.on('connect', () => {
//   console.log('Connected on topic Quarto')
//   client.subscribe([topic3], () => {
//     console.log(`Subscribe to topic '${topic3}'`)

// client.on('message', (topic3, payload) => {
//       temp3 = payload
//       local3= topic3
//      console.log('Received Message:', local3, payload.toString())
//       //res.status(200).json({m})
//     })
//   })
// })

//  client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: true }, (error) => {
//  if (error) {
//      console.error(error)
//    }
//  })

// const topic2 = 'Teste1'
// client.on('connect', () => {
//   console.log('Connected on topic Aqua')
//   client.subscribe([topic2], () => {
//     console.log(`Subscribe to topic '${topic2}'`)

// client.on('message', (topic2, payload) => {
//       temp2 = payload.toString()
//       local2= topic2
//      console.log('Received Aqua Message:', local2, payload.toString())
//      // res.status(200).json({m})
//     })
//   })
// })

 client.publish(topic, 1, { qos: 0, retain: true }, (error) => {
 if (error) {
     console.error(error)
   }
 })


 const onLight=(async (req,res)=>{

try{
  await client.publish(topic, 2, { qos: 0, retain: true }, (error) => {
    if (error) {
          console.error(error)
        }
      })

    }catch(error){
      res.status(500).json({error: error})
    }
 })



module.exports = {

  onLight,
  mqtt2
}