const lang = {
  EN: 'en',
  JP: 'jp',
}
const menu = {
  COSTUME_SELECT: 'costume-select',
  GAME_SELECT: 'game-select',
  MEMBER_SELECT: 'member-select',
  PROFILE: 'profile',
  SETTINGS: 'settings',
  THEME_SELECT: 'theme-select',
  VOICELINES: 'voicelines',
}

let currentLang = lang.EN
let currentMenu = null
let isInterfaceHidden = false
let nameKey // String identifying which language to use for names
let db // Database for storing unlocked characters

// Play a short hop animation for the character
function animateCharacter() {
  let character = document.getElementById('full-illust')

  character.animate(
    [
      // keyframes
      { transform: 'translateY(0)' },
      { transform: 'translateY(-2vh)' },
      { transform: 'translateY(0)' },
    ],
    {
      // timing options
      duration: 100,
    }
  )
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
        child.animate(
          [
            // keyframes
            { transform: 'translateY(100vh)', opacity: 0 },
            { transform: 'translateY(0)', opacity: 1 },
          ],
          {
            // timing options
            duration: animDuration,
            easing: 'ease-out',
            direction: _reverse,
          }
        )
        setTimeout(() => {
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
    return
  } else {
    if (currentMenu != null)
      document.getElementById(currentMenu).classList.remove('active')

    currentMenu = _menu
    document.getElementById(_menu).classList.add('active')
    animatePanel(_menu)
  }

  switch (_menu) {
    case menu.COSTUME_SELECT:
      populateCostumeGrid()
      break
    case menu.GAME_SELECT:
      populateGameGrid()
      break
    case menu.MEMBER_SELECT:
      populateMemberGrid()
      break
    case menu.THEME_SELECT:
      populateThemeGrid()
      break
    case menu.VOICELINES:
      populateVoicelines()
      break
    case menu.PROFILE:
      populateProfileList()
      break
  }
}

function clearPanelContent(_panel) {
  document.getElementById(_panel).innerHTML = ''
}

// Add keydown listeners for menu control
document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'c':
      toggleMenu(menu.MEMBER_SELECT)
      break
    case 'Escape':
      if (isBannerMenuOpen) return
      if (currentMenu == null) toggleMenu(menu.SETTINGS)
      else toggleMenu(currentMenu)
      break
  }
})

// --------
// SETTINGS
// --------

// Switch to page for specified language
function selectLanguage() {
  let selectedLang = document.getElementById('lang-select').value

  if (currentLang == selectedLang) return

  switch (selectedLang) {
    case lang.EN:
      window.location.replace('..')
      break
    case lang.JP:
      window.location.replace('/jp')
      break
  }
}

// Toggle visibility of menu buttons
function toggleInterface() {
  if (isInterfaceHidden) {
    document.getElementById('interface').classList.remove('hidden')
    isInterfaceHidden = false
  } else {
    document.getElementById('interface').classList.add('hidden')
    isInterfaceHidden = true
  }
}

// Directly modify holocoin balance
function addCoinsDirect() {
  let coinInput = prompt('Enter an amount of coins to add:', '100')
  let additionAmount = Number(coinInput)

  if (
    isNaN(additionAmount) ||
    additionAmount - Math.floor(additionAmount) !== 0
  ) {
    alert('Invalid input.')
    return
  }

  currentCoins = Number(currentCoins) + additionAmount
  localStorage.setItem('holoCoins', currentCoins)
  updateCoins()
}

// Unlock all characters
function unlockAll() {
  if (confirm('All characters will be unlocked. Continue?')) {
    Object.keys(member).forEach(value => {
      addData(member[value])
    })
  }
}

// Remove all data from local storage
function clearData() {
  if (confirm('This will remove ALL saved data! Continue?')) {
    localStorage.removeItem('theme')
    localStorage.removeItem('member')
    localStorage.removeItem('volume')
    localStorage.removeItem('holoCoins')

    clearDatabase()
  }
}

// --------
// DATABASE
// --------

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage

function loadData() {
  let request = window.indexedDB.open('members_db', 1)

  request.onerror = () => {
    console.log('Database failed to open')
  }

  request.onsuccess = () => {
    db = request.result

    updateData()
  }

  request.onupgradeneeded = e => {
    let db = e.target.result

    db.createObjectStore('members_os', { keyPath: 'name' })
  }
}

function addData(_data) {
  let newItem = { name: _data['FILE'], value: _data }
  let transaction = db.transaction(['members_os'], 'readwrite')
  let objectStore = transaction.objectStore('members_os')

  objectStore.put(newItem)

  transaction.oncomplete = () => {
    updateData()
  }

  transaction.onerror = () => {
    console.log('Transaction not opened due to error')
  }
}

function updateData() {
  let objectStore = db.transaction('members_os').objectStore('members_os')

  objectStore.openCursor().onsuccess = e => {
    let cursor = e.target.result

    if (cursor) {
      let cursorKey = cursor.value
      let memberKey = Object.keys(member).find(
        key => member[key]['FILE'] === cursorKey['name']
      )

      if (memberKey) {
        member[memberKey]['OWNED'] = true
      }

      cursor.continue()
    }
  }
}

// Clear object store for unlocked characters
function clearDatabase() {
  let objectStore = db
    .transaction('members_os', 'readwrite')
    .objectStore('members_os')

  objectStore.clear()
}

function readObject(object) {
  return object.json()
}

// Load data after document is loaded
document.body.onload = () => {
  currentLang = document.documentElement.lang
  nameKey = `NAME_${currentLang.toUpperCase()}`
  document.getElementById('lang-select').value = currentLang
  loadData()
  updateCoins()
}
