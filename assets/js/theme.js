const theme = {
    LIGHT: {
        NAME: 'light',
        COLOR: 'fff',
        ICON: ''
    },
    DARK: {
        NAME: 'dark',
        COLOR: '333',
        ICON: ''
    },
    GREEN: {
        NAME: 'green',
        COLOR: '00b140',
        ICON: ''
    },
    PEKO: {
        NAME: 'peko',
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

            templateButton.onclick = () => { setTheme(theme[key]['NAME']) }
            templateButton.style.background = `#${theme[key]['COLOR']}`
            templateButton.innerHTML = `<div class="background" style="background-image: url(${theme[key]['ICON']})"></div>`
            document.getElementById('theme-grid').appendChild(templateButton)
        }
    }

    isThemePopulated = true
}