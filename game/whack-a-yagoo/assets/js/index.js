const panel = {
    PREGAME: 'pregame',
    POSTGAME: 'postgame'
}

let maxRows = 3
let maxCols = 3
let maxSpawns = 50
let spawnInterval = 1000 // ms
let stayDuration = 3000 // ms
let hitCount = 0

let positions = []
let timeouts = []

// Animate image sliding in from bottom
function animateYagoo(image, reverse) {
    return new Promise( resolve => {
        image.animate([
            // keyframes
            { transform: 'translateY(18vmin)' },
            { transform: 'translateY(0)' }
        ], {
            // timing options
            duration: 200,
            easing: 'ease-out',
            direction: reverse
        })
        setTimeout( _ => {
            resolve('yagoo animated')
        }, 150)
    })
}

// Create image element at random unoccupied tile
function spawnYagoo() {
    let positionX = Math.floor(Math.random() * maxCols)
    let positionY = Math.floor(Math.random() * maxRows)
    let position = [positionX, positionY]
    let attempt = 0

    while (positions.find(e => e[0] === positionX && e[1] === positionY)) {
        positionX = Math.floor(Math.random() * maxCols)
        positionY = Math.floor(Math.random() * maxRows)
        position = [positionX, positionY]

        if (attempt > 10) break

        attempt++
    }

    positions.push(position)

    let yagooImage = document.createElement('img')

    yagooImage.src = 'assets/img/yagoo.png'
    document.getElementById(`${positionX},${positionY}`).appendChild(yagooImage)
    animateYagoo(yagooImage, 'normal')

    let timeout =
    setTimeout( _ => {
        despawnYagoo(position)
    }, stayDuration)

    timeouts.push(timeout)
}

// Remove child of tile at position
async function despawnYagoo(position, whack) {
    let positionX = position[0]
    let positionY = position[1]
    let tile = document.getElementById(`${positionX},${positionY}`)

    if (!tile.hasChildNodes) return

    let positionIndex = positions.indexOf(position)

    if (positionIndex < 0) {
        positions.find( e => {
            e[0] === positionX && e[1] === positionY
            positionIndex = positions.indexOf(e)
        })
    }

    if (positionIndex > -1) {
        let yagooImage = tile.childNodes[0]

        if (yagooImage === undefined) return

        if (whack) {
            tile.onclick = null
            yagooImage.style.height = '9vmin'
            hitCount++
        }

        await animateYagoo(yagooImage, 'reverse')

        tile.removeChild(tile.childNodes[0])
        tile.onclick = _ => { whackYagoo([positionX, positionY]) }
        positions.splice(positionIndex, 1)
        timeouts.splice(positionIndex, 1)
    }
}

// Squash child of tile at position then despawn
function whackYagoo(position) {
    despawnYagoo(position, whack = true)
}

// Create grid of size maxCols x maxRows
function generateLayout() {
    let game = document.getElementById('game')

    for (let r = 0; r < maxRows; r++) {
        let rowDiv = document.createElement('div')

        rowDiv.className = 'row'

        for (let c = 0; c < maxCols; c++) {
            let tile = document.createElement('div')

            tile.className = 'tile'
            tile.id = `${c},${r}`
            tile.onclick = _ => { whackYagoo([c, r]) }
            rowDiv.appendChild(tile)
        }

        game.appendChild(rowDiv)
    }
}

// Reset hitcount, toggle pregame panel, start spawning YAGOOs
function startGame() {
    hitCount = 0
    togglePanel(panel.PREGAME)

    for (let s = 0; s < maxSpawns; s++) {
        setTimeout(spawnYagoo, spawnInterval * s)
    }

    setTimeout(endGame, (spawnInterval * maxSpawns) + stayDuration)
}

// Set hitcount text, show game end panel
function endGame() {
    document.getElementById('hit-count').innerHTML = hitCount
    togglePanel(panel.POSTGAME)
}

// Close postgame panel, show pregame panel
function restartGame() {
    togglePanel(panel.POSTGAME)
    togglePanel(panel.PREGAME)
}

// Toggle panel specified by 'which'
function togglePanel(which) {
    let panel = document.getElementById(`${which}-panel`)
    
    if (panel.style.display === 'block') {
        panel.style.display = 'none'
    }
    else {
        panel.style.display = 'block'
    }
}

// Set display of pregame panel and generate layout on load
window.onload = _ => {
    togglePanel(panel.PREGAME)
    generateLayout()
}