const menu = {
    MEMBER_SELECT: 'member-select',
    SETTINGS: 'settings',
    THEME_SELECT: 'theme-select'
}

let currentMenu = null

// Set audio source and play audio
function playAudioClip(_member, _clip) {
    let clip = `assets/audio/${_member}/${_clip}.mp3`

    currentAudio.src = clip
    currentAudio.play()
}

// Play a short hop animation for the character
function animateCharacter() {
    let character = document.getElementById('full-illust')

    character.animate([
        // keyframes
        { transform: 'translateY(0)' },
        { transform: 'translateY(-2vh)' },
        { transform: 'translateY(0)' }
    ], {
        // timing options
        duration: 100
    })
}

// Play audio associated with _area for currentMember
function interact(_area) {
    playAudioClip(currentMember, _area)
    animateCharacter()
}

// Play slide-in/slide-out animation for menu panel
function animatePanel(_menu, _reverse) {
    let animDuration = 200
    let menuChildren = document.getElementById(_menu).childNodes

    return new Promise(resolve => {
        for (let i = 0; i < menuChildren.length; i++) {
            let child = menuChildren[i]

            if (child.className == 'panel') {
                child.animate([
                    // keyframes
                    { transform: 'translateY(100vh)', opacity: 0 },
                    { transform: 'translateY(0)', opacity: 1 }
                ], {
                    // timing options
                    duration: animDuration,
                    easing: 'ease-out',
                    direction: _reverse
                })
                setTimeout(_ => {
                    resolve('panel animated')
                }, animDuration - 20)
                break
            }
        }
    })
}

// Toggle active class on specified _menu
async function toggleMenu(_menu) {
    if (currentMenu == _menu) {
        currentMenu = null
        await animatePanel(_menu, 'reverse')
        document.getElementById(_menu).classList.remove('active')
    }
    else {
        currentMenu = _menu
        document.getElementById(_menu).classList.add('active')
        animatePanel(_menu)
    }

    switch (_menu) {
        case menu.MEMBER_SELECT:
            populateMemberGrid()
            break
        case menu.THEME_SELECT:
            populateThemeGrid()
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
    }

    if (cachedMember != null) {
        setMember(cachedMember)
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