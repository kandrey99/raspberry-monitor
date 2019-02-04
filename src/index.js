const mqtt = require('mqtt')
const exec = require("child_process").exec;
const si = require('systeminformation')

const client  = mqtt.connect('mqtt://localhost') 
client.on('connect', () => {
  setInterval(() => {
    si.cpuTemperature().then(data => {
      client.publish('systemInfo.cpuTemperature', JSON.stringify(data))
    })
    si.cpuCurrentspeed().then(data => {
      client.publish('systemInfo.cpuCurrentspeed', JSON.stringify(data))
    })
    si.mem().then(data => {
      client.publish('systemInfo.memUsed', JSON.stringify(data))
    })
    exec('vcgencmd measure_clock arm', (err, stdout, stderr) => {
      client.publish('vcgencmd.measure_clock', stdout)
    })    
    exec('vcgencmd measure_temp', {cwd: './'}, (err, stdout, stderr) => {
      client.publish('vcgencmd.measure_temp', stdout)
    })    
    exec('vcgencmd measure_volts', {cwd: './'}, (err, stdout, stderr) => {
      client.publish('vcgencmd.measure_volts', stdout)
    })    
    exec('vcgencmd get_throttled', {cwd: './'}, (err, stdout, stderr) => {
      client.publish('vcgencmd.get_throttled', stdout)
    })    
  }, 10000)
})
