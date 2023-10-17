const path = require('path');
const osu = require('node-os-utils');
const cpu = osu.cpu
const mem = osu.mem
const os = osu.os

let cpuOverload = 5
let alertFrequency = 1

//Run every 2 sec
setInterval(() => {
  // CPU Usage
  cpu.usage().then(info => {
    document.getElementById('cpu-usage').innerText = info + '%'
    const progressBar = document.getElementById('cpu-progress')
    progressBar.style.width = info + '%'

    // make progressbar red if overload
    if (info >= cpuOverload) {
      progressBar.style.background = 'red'
    } else {
      progressBar.style.background = '#30c88b'
    }

    // Check overload
    if (info >= cpuOverload && runNotify(alertFrequency)) {
      notifyUser({
        title: 'CPU Overload',
        body: `CPU is over ${cpuOverload}`,
        icon: path.join(__dirname, 'img', 'icon.png')
      })

      localStorage.setItem('lastNotify', +new Date())
    }
  })

  // CPU Free
  cpu.free().then(info => {
    document.getElementById('cpu-free').innerText = info + '%'
  })

  document.getElementById('sys-uptime').innerText = secondsToDhms(os.uptime())
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

// Show days, hours, mins, sec
function secondsToDhms(seconds) {
  seconds = +seconds
  const d = Math.floor(seconds / (3600 * 24))
  const h = Math.floor((seconds % (3600 * 24)) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor((seconds % 60))

  return `${d}d, ${h}h, ${m}m, ${s}s`
}

// Send notification
function notifyUser(options) {
  new Notification(options.title, options)
}

// Check how much time has passed since notification
function runNotify(frequency) {
  if (localStorage.getItem('lastNotify') == null) {
    // Store item
    localStorage.setItem('lastNotify', +new Date())
    return true
  }
  const notifyTime = new Date(parseInt(localStorage.getItem('lastNotify')))
  const now = new Date()
  const diffTime = Math.abs(now - notifyTime)
  const munutesPassed = Math.ceil(diffTime / (1000 * 60))
  if (munutesPassed > frequency) {
    return true
  } else {
    return false
  }
}