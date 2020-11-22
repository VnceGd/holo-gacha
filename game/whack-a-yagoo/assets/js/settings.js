let maxRowInput = null
let maxColInput = null
let maxTimeInput = null
let spawnIntervalInput = null
let stayDurationInput = null

let isSettingsInitialized = false

function setMaxRows(_value) {
    maxRows = _value
}

function setMaxCols(_value) {
    maxCols = _value
}

function setMaxTime(_value) {
    maxSpawns = _value
}

function setSpawnInterval(_value) {
    spawnInterval = _value
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
    maxRowInput = document.getElementById('max-rows')
    maxColInput = document.getElementById('max-cols')
    maxTimeInput = document.getElementById('max-time')
    spawnIntervalInput = document.getElementById('spawn-interval')
    stayDurationInput = document.getElementById('stay-duration')

    maxRowInput.onchange = _ => { validateSettings() }
    maxColInput.onchange = _ => { validateSettings() }
    maxTimeInput.onchange = _ => { validateSettings() }
    spawnIntervalInput.onchange = _ => { validateSettings() }
    stayDurationInput.onchange = _ => { validateSettings() }

    validateSettings()

    isSettingsInitialized = true
}

function loadSettings() {
    setMaxRows(maxRowInput.value)
    setMaxCols(maxColInput.value)

    // Convert sec to ms
    setMaxTime(secToMs(maxTimeInput.value))
    setSpawnInterval(secToMs(spawnIntervalInput.value))
    setStayDuration(secToMs(stayDurationInput.value))
}

function validateSettings() {
    if (!isValid(maxRowInput)) {
        maxRowInput.value = defaultMaxRows
    }

    if (!isValid(maxColInput)) {
        maxColInput.value = defaultMaxCols
    }

    if (!isValid(maxTimeInput)) {
        maxTimeInput.value = msToSec(defaultMaxTime)
    }

    if (!isValid(spawnIntervalInput)) {
        spawnIntervalInput.value = msToSec(defaultSpawnInterval)
    }

    if (!isValid(stayDurationInput)) {
        stayDurationInput.value = msToSec(defaultStayDuration)
    }
}

function isValid(_input) {
    let inputValue = Number(_input.value)
    return inputValue >= _input.min && inputValue <= _input.max
}