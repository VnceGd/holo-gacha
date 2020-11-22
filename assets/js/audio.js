const MAX_VOLUME = 100
const MIN_VOLUME = 0

let currentAudio = new Audio()

// Update and cache volume
function setVolume(_volume) {
    currentAudio.volume = _volume / 100
    localStorage.setItem('volume', _volume)
}

// Set currentAudio volume level and update paired input value
function changeVolume(_value = false) {
    let inputRange = document.getElementById('audio')
    let inputNumber = document.getElementById('audio-value')

    if (_value) {
        let inputVolume = inputNumber.value
        let isError = false

        if (inputVolume > MAX_VOLUME) {
            inputVolume = MAX_VOLUME
            isError = true
        }
        else if (inputVolume < MIN_VOLUME) {
            inputVolume = MIN_VOLUME
            isError = true
        }
        else if (!inputVolume.match(/^[0-9]+$/)) { // Regex check for whole number input
            inputVolume = MAX_VOLUME
            isError = true
        }

        if (isError) inputNumber.value = inputVolume

        inputRange.value = inputVolume
    }
    else {
        inputNumber.value = inputRange.value
    }

    setVolume(inputRange.value)
}

// Call changeVolume with _value = true to update paired input range
function changeVolumeValue() {
    changeVolume(_value = true)
}