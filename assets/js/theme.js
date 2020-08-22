const theme = {
    LIGHT: 'light',
    DARK: 'dark'
}

let currentTheme = theme.LIGHT

// Apply and cache specified _theme
function setTheme(_theme) {
    currentTheme = _theme
    document.documentElement.setAttribute('theme', _theme)
    localStorage.setItem('theme', currentTheme)
}

// Set theme based on select element value
function changeTheme() {
    setTheme(document.getElementById('theme').value)
}

// Load theme from local storage
function loadPrefs() {
    currentTheme = localStorage.getItem('theme')

    if (currentTheme != null) {
        setTheme(currentTheme)
        document.getElementById('theme').value = currentTheme
    }
}

// Load preferences after document is loaded
document.addEventListener("DOMContentLoaded", () => {
    loadPrefs()
})