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
    let selectElement = document.getElementById('theme')
    
    setTheme(selectElement.value)
}

// Load theme from local storage
function loadPrefs() {
    try { currentTheme = localStorage.getItem('theme') }
    catch { console.log('No theme cached') }

    setTheme(currentTheme)
}

// Load preferences after document is loaded
document.addEventListener("DOMContentLoaded", () => {
    loadPrefs()
})