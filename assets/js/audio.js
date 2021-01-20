const audio = {
  Voice: 'voice',
  SFX: 'sfx',
}

const MAX_VOLUME = 100
const MIN_VOLUME = 0

let audioCtx
let currentAudio = new Audio()
let currentSFX = new Audio()

// Update and cache volume
function setVolume(_type, _volume) {
  switch (_type) {
    case audio.Voice:
      currentAudio.volume = _volume / 100
      break
    case audio.SFX:
      currentSFX.volume = _volume / 100
      break
  }

  localStorage.setItem(`${_type}-volume`, _volume)
}

// Set currentAudio volume level and update paired input value
function changeVolume(_type, _value = false) {
  let inputRange = document.getElementById(`${_type}`)
  let inputNumber = document.getElementById(`${_type}-value`)

  if (_value) {
    let inputVolume = inputNumber.value
    let isError = false

    if (inputVolume > MAX_VOLUME) {
      inputVolume = MAX_VOLUME
      isError = true
    } else if (inputVolume < MIN_VOLUME) {
      inputVolume = MIN_VOLUME
      isError = true
    } else if (!inputVolume.match(/^[0-9]+$/)) {
      // Regex check for whole number input
      inputVolume = MAX_VOLUME
      isError = true
    }

    if (isError) inputNumber.value = inputVolume

    inputRange.value = inputVolume
  } else {
    inputNumber.value = inputRange.value
  }

  setVolume(_type, inputRange.value)
}

// Call changeVolume with _value = true to update paired input range
function changeVolumeValue() {
  changeVolume((_value = true))
}

// Play sound effect given filename
function playSoundEffect(_effect) {
  currentSFX.src = `assets/audio/sfx/${_effect}.mp3`
  currentSFX.play()
}

// Set audio source and play audio
function playAudioClip(_member, _clip) {
  currentAudio.src = `assets/audio/${_member['FILE']}/${_clip}.mp3`
  currentAudio.play()
}

// Pause voice line
function stopAudio() {
  if (!currentAudio.paused) currentAudio.pause()
}

// Load inputs for changing audio in settings menu
function loadAudioInput() {
  let inputDiv = document.getElementById('audio-input')
  for (const key in audio) {
    let value = audio[key]
    let template = `
    <p>${key}</p>
    <input class="audio-range" id="${value}" type="range" list="volume-levels" value="100" onchange="changeVolume('${value}')" oninput="changeVolume('${value}')">
    <input class="audio-value" id="${value}-value" type="number" value="100" min="0" max="100" onchange="changeVolumeValue('${value}')"></input>`
    inputDiv.innerHTML += template
  }
}

// Load volume value from cache
function loadVolumeSettings() {
  for (const key in audio) {
    let value = audio[key]
    let cachedVolume = localStorage.getItem(`${value}-volume`)

    if (cachedVolume != null) {
      setVolume(value, cachedVolume)
      document.getElementById(`${value}`).value = cachedVolume
      document.getElementById(`${value}-value`).value = cachedVolume
    }
  }
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

  loadAudioInput()
  loadVolumeSettings()
}

loadAudio()
