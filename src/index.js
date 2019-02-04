const si = require('systeminformation')
const mqtt = require('mqtt')

const client  = mqtt.connect('mqtt://localhost') 
client.on('connect', () => {
  setInterval(() => {
    si.cpuTemperature().then(data => {
      client.publish('systemInfo.cpuTemperature', JSON.stringify(data))
    })
    si.cpuCurrentspeed().then(data => {
      client.publish('systemInfo.cpuCurrentspeed', JSON.stringify(data))
    })
  }, 10000)
})
