const menu = {
    MEMBER_SELECT: 'member-select',
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

    switch (_menu) {
        case menu.MEMBER_SELECT:
            populateMemberGrid()
            break
    }
}

// Load settings from local storage
function loadPrefs() {
    let cachedTheme = localStorage.getItem('theme')
    let cachedMember = localStorage.getItem('member')
    let cachedVolume = localStorage.getItem('volume')

    if (cachedTheme != null) {
        setTheme(cachedTheme)
        document.getElementById('theme').value = cachedTheme
    }

    if (cachedMember != null) {
        setMember(cachedMember)
        document.getElementById('member').value = cachedMember
    }

    if (cachedVolume != null) {
        setVolume(cachedVolume)
        document.getElementById('audio').value = cachedVolume
        document.getElementById('audio-value').value = cachedVolume
    }
}

// Load preferences after document is loaded
document.addEventListener("DOMContentLoaded", () => {
    loadPrefs()
})