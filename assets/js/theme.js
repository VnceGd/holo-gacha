const theme = {
    LIGHT: {
        NAME_EN: 'Light',
        NAME_JP: '光',
        COLOR: 'fff',
        ICON: ''
    },
    DARK: {
        NAME_EN: 'Dark',
        NAME_JP: '暗い',
        COLOR: '333',
        ICON: ''
    },
    GREEN: {
        NAME_EN: 'Green',
        NAME_JP: '緑',
        COLOR: '00b140',
        ICON: ''
    },
    PEKO: {
        NAME_EN: 'Peko',
        NAME_JP: 'ペコ',
        COLOR: 'fff',
        ICON: 'assets/img/pekora/ninjin.svg'
    },
}

let currentTheme = theme.LIGHT.NAME
let isThemePopulated = false

// Apply and cache theme
function setTheme(_theme) {
    currentTheme = _theme
    document.documentElement.setAttribute('theme', _theme)
    localStorage.setItem('theme', _theme)
}

// Add buttons for each theme to the theme grid unless already populated
function populateThemeGrid() {
    if (isThemePopulated) return

    for (const key in theme) {
        if (theme.hasOwnProperty(key)) {
            let templateButton = document.createElement('button')

            templateButton.onclick = () => {
                setTheme(theme[key]['NAME_EN'])
                playSoundEffect('btn-click')
            }
            templateButton.style.background = `#${theme[key]['COLOR']}`
            templateButton.innerHTML = `<div class="background" style="background-image: url(${theme[key]['ICON']})"></div><p class="tooltip bottom">${theme[key][nameKey]}</p>`
            document.getElementById('theme-grid').appendChild(templateButton)
        }
    }

    isThemePopulated = true
}