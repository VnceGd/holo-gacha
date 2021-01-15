let gridSizeInput = null
let maxTimeInput = null
let spawnRateInput = null
let stayDurationInput = null

let isSettingsInitialized = false

function setGridSize(_value) {
  gridSize = _value
}

function setMaxTime(_value) {
  maxTime = _value
}

function setspawnRate(_value) {
  spawnRate = _value
}

function setStayDuration(_value) {
  stayDuration = _value
}

function secToMs(_value) {
  return _value * 1000
}

function msToSec(_value) {
  return Math.floor(_value / 1000)
}

function initializeSettings() {
  gridSizeInput = document.getElementById('grid-size')
  maxTimeInput = document.getElementById('max-time')
  spawnRateInput = document.getElementById('spawn-rate')
  //   stayDurationInput = document.getElementById('stay-duration')

  gridSizeInput.onchange = () => {
    validateSettings()
  }
  maxTimeInput.onchange = () => {
    validateSettings()
  }
  spawnRateInput.onchange = () => {
    validateSettings()
  }
  //   stayDurationInput.onchange = () => {
  //     validateSettings()
  //   }

  validateSettings()

  isSettingsInitialized = true
}

function loadSettings() {
  setGridSize(gridSizeInput.value)
  setMaxTime(secToMs(maxTimeInput.value))
  setspawnRate(secToMs(spawnRateInput.value))
  //   setStayDuration(secToMs(stayDurationInput.value))
}

function validateSettings() {
  if (!isValid(gridSizeInput)) {
    gridSizeInput.value = defaultGridSize
  }

  if (!isValid(maxTimeInput)) {
    maxTimeInput.value = msToSec(defaultMaxTime)
  }

  if (!isValid(spawnRateInput)) {
    spawnRateInput.value = msToSec(defaultspawnRate)
  }

  //   if (!isValid(stayDurationInput)) {
  //     stayDurationInput.value = msToSec(defaultStayDuration)
  //   }
}

function isValid(_input) {
  let inputValue = Number(_input.value)
  return inputValue >= _input.min && inputValue <= _input.max
}
