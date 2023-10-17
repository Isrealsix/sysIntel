const path = require('path');
const osu = require('node-os-utils');
const cpu = osu.cpu
const mem = osu.mem
const os = osu.os

//Run every 2 sec
setInterval(() => {
  // CPU Usage
  cpu.usage().then(info => {
    document.getElementById('cpu-usage').innerText = info + '%'
  })
}, 2000)
// Set model
document.getElementById('cpu-model').innerText = cpu.model()

//Computer name
document.getElementById('comp-name').innerText = os.hostname()

// OS
document.getElementById('os').innerText = `${os.type()} ${os.arch()}`

// Total mem
mem.info().then((info) => {
  document.getElementById('mem-total').innerText = info.totalMemMb
})