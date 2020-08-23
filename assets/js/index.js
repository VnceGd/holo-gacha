const menu = {
    SETTINGS: 'settings'
}

let currentMenu = null

// Set audio source and play audio
function playAudioClip(_member, _clip) {
    let clip = `assets/audio/${_member}/${_clip}.mp3`

    currentAudio.src = clip
    currentAudio.play()
}

// Play a short hop animation for the character
function playAnimation() {
    let character = document.getElementById('full-illust')

    character.animate([
        // keyframes
        { transform: 'translateY(0)' },
        { transform: 'translateY(-2vh)' },
        { transform: 'translateY(0)' }
    ], {
        // timing options
        duration: 100,
        iterations: 1
    })
}

// Play audio associated with _area for currentMember
function interact(_area) {
    playAudioClip(currentMember, _area)
    playAnimation()
}

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

// Load settings from local storage
function loadPrefs() {
    currentTheme = localStorage.getItem('theme')
    currentMember = localStorage.getItem('member')
    currentVolume = localStorage.getItem('volume')

    if (currentTheme != null) {
        setTheme(currentTheme)
        document.getElementById('theme').value = currentTheme
    }

    if (currentMember != null) {
        setMember(currentMember)
        document.getElementById('member').value = currentMember
    }

    if (currentVolume != null) {
        setVolume(currentVolume)
        document.getElementById('audio').value = currentVolume
        document.getElementById('audio-value').value = currentVolume
    }
}

// Load preferences after document is loaded
document.addEventListener("DOMContentLoaded", () => {
    loadPrefs()
})