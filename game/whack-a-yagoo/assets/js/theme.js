const theme = {
  LIGHT: 'light',
  DARK: 'dark',
}

let currentTheme = theme.LIGHT

function updateTheme() {
  document.documentElement.setAttribute('theme', currentTheme)
  localStorage.setItem('yagooTheme', currentTheme)
}

function setTheme(newTheme) {
  console.log(newTheme)
  currentTheme = newTheme
  updateTheme()
}

function loadTheme() {
  let cachedTheme = localStorage.getItem('yagooTheme')
  if (cachedTheme != null) setTheme(cachedTheme)
}

loadTheme()
