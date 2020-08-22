const menu = {
    SETTINGS: 'settings'
}

const member = {
    POLKA: 'polka'
}

const area = {
    HEAD: 'tap-head',
    CHEST: 'tap-chest'
}

let currentMenu = null
let currentMember = member.POLKA
let currentAudio = new Audio()

// Set Methods
// -----------
function setMember(_member) {
    currentMember = _member
}

function setVolume(_volume) {
    currentAudio.volume = _volume
}
// -----------

// Toggle active class on specified _menu
function toggleMenu(_menu) {
    if (currentMenu == _menu) {
        document.getElementById(currentMenu).classList.toggle('active')
        currentMenu = null
    }
    else {
        currentMenu = _menu
        document.getElementById(currentMenu).classList.add('active')
    }
}

// Set audio source and play audio
function playAudioClip(_member, _clip) {
    let clip = `assets/audio/${_member}/${_clip}.mp3`

    currentAudio.src = clip
    currentAudio.play()
}

// Play audio associated with _area for currentMember
function interact(_area) {
    playAudioClip(currentMember, _area)
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

    setVolume(inputRange.value / 100)
}