const MAX_VOLUME = 100
const MIN_VOLUME = 0

let audioCtx
let currentAudio = new Audio()
let currentSFX = new Audio()

// Update and cache volume
function setVolume(_volume) {
    currentAudio.volume = _volume / 100
    currentSFX.volume = _volume / 100
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

// Play sound effect given filename
function playSoundEffect(_effect) {
    let sfx = `assets/audio/${_effect}.mp3`

    currentSFX.src = sfx
    currentSFX.play()
}

// Set audio source and play audio
function playAudioClip(_member, _clip) {
    let clip = `assets/audio/${_member['FILE']}/${_clip}.mp3`

    currentAudio.src = clip
    currentAudio.play()
}

// Pause voice line
function stopAudio() {
    if (!currentAudio.paused) currentAudio.pause()
}

// Add event listeners to buttons for playing SFX
function loadAudio() {
    let AudioContext = window.AudioContext || window.webkitAudioContext
    audioCtx = new AudioContext()

    let buttons = document.getElementsByTagName('button')
    
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', e => {
            playSoundEffect('btn-click')
        })
    }
}