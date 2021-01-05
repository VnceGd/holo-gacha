const game = {
  WHACK_A_YAGOO: 'whack-a-yagoo',
}

let isGamePopulated = false

// Add buttons for each game to the game grid unless already populated
function populateGameGrid() {
  if (isGamePopulated) return

  Object.values(game).forEach(g => {
    let templateButton = document.createElement('button')

    templateButton.innerHTML = `<a href="game/${g}"><img loading="lazy" src="assets/img/game/${g}.png"></a><p class="tooltip bottom"> ${g}</p>`
    document.getElementById('game-grid').appendChild(templateButton)
  })

  isGamePopulated = true
}
