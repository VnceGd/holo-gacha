const banner = {
  DEFAULT: {
    SORA: member.SORA,
    ROBOCO: member.ROBOCO,
    MIKO: member.MIKO,
    MEL: member.MEL,
    FUBUKI: member.FUBUKI,
    MATSURI: member.MATSURI,
    ROSENTHAL: member.ROSENTHAL,
    HAATO: member.HAATO,
    AQUA: member.AQUA,
    SHION: member.SHION,
    AYAME: member.AYAME,
    CHOCO: member.CHOCO,
    SUBARU: member.SUBARU,
    MIO: member.MIO,
    IMG: 'default.png',
  },
  // SHINY_SMILY_STORY: {
  //   SUISEI: member.SUISEI,
  //   IMG: 'shiny_smily_story.jpg'
  // },
}

let currentCoins = 0
let bannerCost = 100
let isBannerMenuOpen = false

// Create a fullscreen window with a banner image and roll gacha button
function openBannerMenu() {
  if (isBannerMenuOpen) return

  let bannerDiv = document.createElement('div')
  let bannerListing = document.createElement('div')
  let bannerContent = document.createElement('div')
  let bannerTop = document.createElement('div')
  let bannerImg = document.createElement('img')
  let rollButton = document.createElement('button')
  let closeButton = document.createElement('button')
  let holoCoinDisplay = document.createElement('p')

  let handleKeyDown = e => {
    if (e.key == 'Escape') closePanel()
  }

  let closePanel = _ => {
    bannerDiv.animate(
      [
        // keyframes
        { transform: 'scale(1)', opacity: '1' },
        { transform: 'scale(0)', opacity: '0' },
      ],
      {
        // timing options
        duration: 300,
        easing: 'ease-out',
      }
    )
    setTimeout(_ => {
      bannerDiv.remove()
    }, 250)
    document.removeEventListener('keydown', handleKeyDown)
    isBannerMenuOpen = false
  }

  let selectBanner = _banner => {
    rollButton.onclick = _ => {
      rollGacha(_banner)
    }
    bannerImg.src = `assets/img/banner/${_banner['IMG']}`
  }

  for (const key in banner) {
    let bannerBtn = document.createElement('button')

    bannerBtn.className = 'banner-btn'
    bannerBtn.style.backgroundImage = `url('assets/img/banner/${banner[key]['IMG']}')`
    bannerBtn.onclick = _ => {
      selectBanner(banner[key])
    }

    bannerListing.appendChild(bannerBtn)
  }

  bannerImg.src = `assets/img/banner/default.png`
  bannerContent.appendChild(bannerImg)

  bannerDiv.id = 'gacha-banner'
  bannerListing.className = 'listing'
  bannerContent.className = 'content'

  rollButton.id = 'gacha-roll-btn'
  rollButton.innerHTML = `Roll x1<br>
        <span><svg viewBox="0 0 1 1">
            <use href="#holocoin-svg"/>
        </svg> x 100</span>`
  rollButton.onclick = _ => {
    rollGacha()
  }

  holoCoinDisplay.innerHTML = `<span name='holocoin-amount'>${currentCoins}
        </span> <span><svg viewBox="0 0 1 1">
            <use href="#holocoin-svg"/>
        </svg></span>`

  closeButton.id = 'gacha-close-btn'
  closeButton.innerHTML = `<svg viewBox="0 0 1 1">
        <use href="#exit-svg"/>
        </svg>`
  closeButton.onclick = _ => {
    closePanel()
    playSoundEffect('btn-click')
  }

  bannerTop.className = 'top'
  bannerTop.appendChild(holoCoinDisplay)
  bannerTop.appendChild(closeButton)

  bannerDiv.appendChild(bannerListing)
  bannerDiv.appendChild(bannerContent)
  bannerDiv.appendChild(bannerTop)
  bannerDiv.appendChild(rollButton)

  document.body.appendChild(bannerDiv)

  bannerDiv.animate(
    [
      // keyframes
      { transform: 'scale(0)', opacity: '0' },
      { transform: 'scale(1)', opacity: '1' },
    ],
    {
      // timing options
      duration: 300,
      easing: 'ease-out',
    }
  )

  document.addEventListener('keydown', handleKeyDown)

  isBannerMenuOpen = true
}

// Obtain a random character on the specified banner if funds are sufficient
function rollGacha(rollBanner = banner.DEFAULT) {
  if (currentCoins < bannerCost) {
    alert('Insufficient funds. Play games to earn HoloCoins!')
    return
  }

  let rng = Math.floor(Math.random() * (Object.keys(rollBanner).length - 1))
  let bannerKey = Object.keys(banner).find(key => banner[key] === rollBanner)
  let rngKey = Object.keys(rollBanner)[rng]

  playGachaAnimation(rollBanner[rngKey]['FILE'])
  playSoundEffect('gacha')
  banner[bannerKey][rngKey]['OWNED'] = true
  addData(rollBanner[rngKey])
  removeCoins(bannerCost)
}

// Create fullscreen window and play fancy animations
function playGachaAnimation(_character) {
  let animation // Character appear animation
  let animationDuration = 4813 // Timed to line up with SFX
  let isAnimationFinished = false
  let animationDiv = document.createElement('div')
  let characterImg = document.createElement('img')
  let continueBtn = document.createElement('button')

  let closePanel = _ => {
    stopAudio()
    animationDiv.animate(
      [
        // keyframes
        { transform: 'translateY(0)' },
        { transform: 'translateY(100vh)' },
      ],
      {
        // timing options
        duration: 300,
        easing: 'ease-out',
      }
    )
    setTimeout(_ => {
      animationDiv.remove()
    }, 250)
  }

  let skipAnimation = _ => {
    if (isAnimationFinished) return

    let characterName = document.createElement('p')
    let memberKey = Object.keys(member).find(
      key => member[key]['FILE'] === _character
    )

    characterName.innerHTML = member[memberKey][nameKey]
    animationDiv.appendChild(characterName)

    continueBtn.innerHTML = 'Continue'
    continueBtn.onclick = _ => {
      closePanel()
      playSoundEffect('btn-click')
    }

    animation.finish()

    setTimeout(_ => {
      playAudioClip(member[memberKey], 'gacha')
    }, 100)

    isAnimationFinished = true
  }

  animationDiv.id = 'gacha-animation'
  characterImg.src = `assets/img/${_character}/full.webp`
  characterImg.onerror = _ => {
    characterImg.src = `assets/img/${_character}/full.png`
  }

  continueBtn.innerHTML = 'Skip'
  continueBtn.onclick = _ => {
    skipAnimation()
    playSoundEffect('btn-click')
  }

  animationDiv.appendChild(characterImg)
  animationDiv.appendChild(continueBtn)
  document.body.appendChild(animationDiv)

  animationDiv.animate(
    [
      // keyframes
      { transform: 'translateY(100vh)' },
      { transform: 'translateY(0)' },
    ],
    {
      // timing options
      duration: 500,
      easing: 'ease-out',
    }
  )

  animation = characterImg.animate(
    [
      // keyframes
      { transform: 'translateY(50vh) scale(4)', opacity: '0' },
      { transform: 'translateY(-100vh) scale(4)' },
      { opacity: '1' }, // end at default state
    ],
    {
      // timing options
      duration: animationDuration,
      easing: 'cubic-bezier(.8, 0  , 1, .8)',
    }
  )

  setTimeout(skipAnimation, animationDuration)
}

// Remove coins from local storage and update text
function removeCoins(_amount) {
  localStorage.setItem('holoCoins', (currentCoins -= _amount))
  updateCoins()
}

// Update text displaying coin amount
function updateCoins() {
  let coinAmountText = document.getElementsByName('holocoin-amount')
  currentCoins = localStorage.getItem('holoCoins')

  if (!currentCoins)
    coinAmountText.forEach(txtElement => {
      txtElement.innerHTML = 0
    })
  else
    coinAmountText.forEach(txtElement => {
      txtElement.innerHTML = currentCoins
    })
}
