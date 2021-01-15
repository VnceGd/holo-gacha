const panel = {
  PREGAME: 'pregame',
  POSTGAME: 'postgame',
  SETTINGS: 'settings',
}

const defaultGridSize = 3
const defaultMaxTime = 30000 // ms
const defaultSpawnRate = 1500 // ms
const defaultStayDuration = 3000 // ms
const yagooCoinValue = 5

let gridSize = defaultGridSize
let maxTime = defaultMaxTime
let spawnRate = defaultSpawnRate
let stayDuration = defaultStayDuration

let maxSpawns = 0
let hitCount = 0

let positions = []
let spawnTimeouts = []
let despawnTimeouts = []
let timerInterval = null

let remainingTime = 0 // sec
let remainingSpawns = 0

// Animate image sliding in from bottom
function animateYagoo(image, reverse) {
  return new Promise(resolve => {
    image.animate(
      [
        // keyframes
        { transform: `translateY(${90 / (gridSize * 2 - 1)}vmin)` },
        { transform: 'translateY(0)' },
      ],
      {
        // timing options
        duration: 200,
        easing: 'ease-out',
        direction: reverse,
      }
    )
    setTimeout(() => {
      resolve('yagoo animated')
    }, 150)
  })
}

// Create image element at random unoccupied tile
function spawnYagoo() {
  let positionX = Math.floor(Math.random() * gridSize)
  let positionY = Math.floor(Math.random() * gridSize)
  let position = [positionX, positionY]
  let attempt = 0
  let maxAttempts = gridSize * gridSize

  while (positions.find(e => e[0] === positionX && e[1] === positionY)) {
    positionX = Math.floor(Math.random() * gridSize)
    positionY = Math.floor(Math.random() * gridSize)
    position = [positionX, positionY]

    if (attempt > maxAttempts) break

    attempt++
  }

  positions.push(position)

  let yagooImage = document.createElement('img')

  yagooImage.src = 'assets/img/yagoo.png'
  document.getElementById(`${positionX},${positionY}`).appendChild(yagooImage)
  animateYagoo(yagooImage, 'normal')

  let timeout = setTimeout(() => {
    despawnYagoo(position)
  }, stayDuration)

  despawnTimeouts.push(timeout)
  remainingSpawns--
}

// Remove child of tile at position
async function despawnYagoo(position, whack) {
  let positionX = position[0]
  let positionY = position[1]
  let tile = document.getElementById(`${positionX},${positionY}`)

  if (!tile.hasChildNodes) return

  let positionIndex = positions.indexOf(position)

  if (positionIndex < 0) {
    positions.find(e => {
      e[0] === positionX && e[1] === positionY
      positionIndex = positions.indexOf(e)
    })
  }

  if (positionIndex > -1) {
    let yagooImage = tile.childNodes[0]

    if (yagooImage === undefined) return

    if (whack) {
      clearTimeout(despawnTimeouts[positionIndex])
      tile.onclick = null
      yagooImage.style.height = `${90 / (gridSize * 4 - 1)}vmin`
      hitCount++
    }

    await animateYagoo(yagooImage, 'reverse')

    tile.removeChild(tile.childNodes[0])
    tile.onclick = () => {
      whackYagoo([positionX, positionY])
    }
    positions.splice(positionIndex, 1)
    despawnTimeouts.splice(positionIndex, 1)
  }
}

// Squash child of tile at position then despawn
function whackYagoo(position) {
  despawnYagoo(position, (whack = true))
}

// Create grid of size maxCols x maxRows
function generateLayout() {
  let game = document.getElementById('game')
  let gap, rows

  game.innerHTML = ''

  for (let r = 0; r < gridSize; r++) {
    let rowDiv = document.createElement('div')

    rowDiv.className = 'row'

    for (let c = 0; c < gridSize; c++) {
      let tile = document.createElement('div')

      tile.className = 'tile'
      tile.id = `${c},${r}`
      tile.onclick = () => {
        whackYagoo([c, r])
      }

      gap = 90 / (gridSize * 2 - 1)
      tile.style.width = `${gap}vmin`
      tile.style.height = `${gap}vmin`
      tile.style.clipPath = `circle(${gap / 2}vmin at center)`
      rowDiv.appendChild(tile)
    }

    game.appendChild(rowDiv)
  }

  game.style.rowGap = `${gap}vmin`
  rows = document.getElementsByClassName('row')
  for (let i = 0; i < rows.length; i++) {
    rows[i].style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`
    rows[i].style.columnGap = `${gap}vmin`
  }
}

// Start countdown until end of game
function startTimer(duration, display) {
  let timer = duration,
    minutes,
    seconds

  let updateTimer = () => {
    minutes = parseInt(timer / 60, 10)
    seconds = parseInt(timer % 60, 10)

    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds

    if (seconds < 0) seconds = 0

    display.textContent = minutes + ':' + seconds
  }

  clearTimer()
  updateTimer()

  remainingTime = duration

  timerInterval = setInterval(() => {
    updateTimer()

    if (--timer < 0) {
      endGame()
    }
    --remainingTime
  }, 1000)
}

// Clear countdown timer and set to null
function clearTimer() {
  if (timerInterval == null) return

  clearInterval(timerInterval)
  timerInterval = null
}

// Reset hitcount, toggle pregame panel, start spawning YAGOOs
function startGame() {
  hitCount = 0

  if (isSettingsInitialized) {
    console.log('Settings initialized')
    loadSettings()
  }

  togglePanel(panel.PREGAME)
  generateLayout()

  maxSpawns = Math.floor(maxTime / spawnRate)
  remainingSpawns = maxSpawns

  for (let s = 0; s < maxSpawns; s++) {
    spawnTimeouts.push(setTimeout(spawnYagoo, spawnRate * s))
  }

  startTimer(msToSec(maxTime), document.getElementById('timer-text'))
}

// Resumes game with remaining spawns and time
function resumeGame() {
  if (remainingSpawns <= 0 || remainingTime <= 0) return

  togglePanel(panel.POSTGAME)

  for (let s = 0; s < remainingSpawns; s++) {
    spawnTimeouts.push(setTimeout(spawnYagoo, spawnRate * s))
  }

  startTimer(remainingTime, document.getElementById('timer-text'))
}

// Set hitcount text, show game end panel
function endGame() {
  let coinsEarned = yagooCoinValue * hitCount
  clearTimer()

  if (spawnTimeouts.length > 0) {
    for (let t = 0; t < spawnTimeouts.length; t++) {
      clearTimeout(spawnTimeouts[t])
    }
    spawnTimeouts = []
  }

  if (remainingSpawns <= 0 || remainingTime <= 0) {
    document.getElementById('postgame-header').innerHTML = 'GAME END'
    document.getElementById('resume-btn').style.visibility = 'hidden'
    document.getElementById('coin-count').innerHTML = `HoloCoins earned: ${coinsEarned}`
    addHoloCoin(coinsEarned)
  } else {
    document.getElementById('postgame-header').innerHTML = 'GAME PAUSED'
    document.getElementById('resume-btn').style.visibility = 'visible'
    document.getElementById('coin-count').innerHTML = ''
  }

  document.getElementById('hit-count').innerHTML = `${hitCount} / ${maxSpawns}`
  togglePanel(panel.POSTGAME)
}

// Close postgame panel, show pregame panel
function restartGame() {
  togglePanel(panel.POSTGAME)
  togglePanel(panel.PREGAME)
}

// Toggle panel specified by 'which'
function togglePanel(which) {
  let panelToggled = document.getElementById(`${which}-panel`)

  if (panelToggled.style.display === 'block') {
    panelToggled.style.display = 'none'
  } else {
    panelToggled.style.display = 'block'

    if (!isSettingsInitialized && which === panel.SETTINGS) {
      initializeSettings()
    }
  }
}

// Add holocoin funds equal to amount
function addHoloCoin(amount) {
  let currentCoinAmount = parseInt(localStorage.getItem('holoCoins'))

  if (currentCoinAmount) localStorage.setItem('holoCoins', currentCoinAmount + amount)
  else localStorage.setItem('holoCoins', amount)
}

// Set display of pregame panel and generate layout on load
window.onload = () => {
  togglePanel(panel.PREGAME)
}
