const { ipcRenderer } = require('electron');
const settingsForm = document.getElementById('settings-form');

// Get settings
ipcRenderer.on('settings:get', (e, settings) => {
  const cpuOverload = document.getElementById('cpu-overload')
  const alertFrequency = document.getElementById('alert-frequency')

  cpuOverload.value = settings.cpuOverloadValue
  alertFrequency.value = settings.alertFrequencyValue
})

// Submit settings
settingsForm.addEventListener('submit', ev => {
  ev.preventDefault()
  const cpuOverload = document.getElementById('cpu-overload')
  const alertFrequency = document.getElementById('alert-frequency')
  const cpuOverloadValue = cpuOverload.value
  const alertFrequencyValue = alertFrequency.value

  // Set new settings to main process
  ipcRenderer.send('settings:set', {
    cpuOverloadValue,
    alertFrequencyValue
  })

  showAlert('settings saved');
})

function showAlert(msg) {
  const alert = document.getElementById('alert')
  alert.classList.remove('hide')
  alert.classList.add('alert')
  alert.innerText = msg

  setTimeout(() => {
    alert.classList.add('hide')
  }, 3000);
}