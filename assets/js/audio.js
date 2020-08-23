let currentAudio = new Audio()
let currentVolume = 100

// Update and cache volume
function setVolume(_volume) {
    currentAudio.volume = _volume / 100
    localStorage.setItem('volume', _volume)
}

// Set currentAudio volume level and update paired input value
function changeVolume(_value) {
    let inputRange = document.getElementById('audio')
    let inputNumber = document.getElementById('audio-value')

    if (_value) {
        inputRange.value = inputNumber.value
    }
    else {
        inputNumber.value = inputRange.value
    }

    setVolume(inputRange.value)
}