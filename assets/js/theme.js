const theme = {
    LIGHT: 'light',
    DARK: 'dark'
}

let currentTheme = theme.LIGHT

// Apply and cache theme
function setTheme(_theme) {
    currentTheme = _theme
    document.documentElement.setAttribute('theme', _theme)
    localStorage.setItem('theme', _theme)
}

// Set theme based on select element value
function changeTheme() {
    setTheme(document.getElementById('theme').value)
}