const costume_state = {
    LOCKED: 0,
    OWNED: 1,
    ACTIVE: 2
}
const costume_type = {
    DEFAULT: {
        FILE: 'full',
        NAME_EN: 'Default',
        NAME_JP: 'デフォルト',
        STATE: costume_state.LOCKED
    },
    NEW_YEAR: {
        FILE: 'new_year',
        NAME_EN: 'New Year',
        NAME_JP: '新年',
        STATE: costume_state.LOCKED
    },
    NONSTOP_STORY: {
        FILE: 'nonstop_story',
        NAME_EN: 'Nonstop Story',
        NAME_JP: 'ノンストップストーリー',
        STATE: costume_state.LOCKED
    },
    ORIGINAL: {
        FILE: 'original',
        NAME_EN: 'Original',
        NAME_JP: 'オリジナル',
        STATE: costume_state.LOCKED
    }
}
const costume = {
    SORA: {
        FILE: 'sora',
        DEFAULT: costume_type.DEFAULT,
        NONSTOP_STORY: costume_type.NONSTOP_STORY
    },
    ROBOCO: {
        FILE: 'roboco',
        DEFAULT: costume_type.DEFAULT,
        NEW_YEAR: costume_type.NEW_YEAR,
        NONSTOP_STORY: costume_type.NONSTOP_STORY
    },
    MIKO: {
        FILE: 'miko',
        DEFAULT: costume_type.DEFAULT,
        NONSTOP_STORY: costume_type.NONSTOP_STORY,
        ORIGINAL: costume_type.ORIGINAL,
    },
    // SUISEI: {
    //     FILE: 'suisei',
    //     DEFAULT: costume_type.DEFAULT,
    // },
    MEL: {
        FILE: 'mel',
        DEFAULT: costume_type.DEFAULT,
        NEW_YEAR: costume_type.NEW_YEAR,
        NONSTOP_STORY: costume_type.NONSTOP_STORY
    },
    FUBUKI: {
        FILE: 'fubuki',
        DEFAULT: costume_type.DEFAULT,
    },
    MATSURI: {
        FILE: 'matsuri',
        DEFAULT: costume_type.DEFAULT,
    },
    ROSENTHAL: {
        FILE: 'rosenthal',
        DEFAULT: costume_type.DEFAULT,
    },
    HAATO: {
        FILE: 'haato',
        DEFAULT: costume_type.DEFAULT,
    },
    AQUA: {
        FILE: 'aqua',
        DEFAULT: costume_type.DEFAULT,
    },
    SHION: {
        FILE: 'shion',
        DEFAULT: costume_type.DEFAULT,
    },
    AYAME: {
        FILE: 'ayame',
        DEFAULT: costume_type.DEFAULT,
    },
    CHOCO: {
        FILE: 'choco',
        DEFAULT: costume_type.DEFAULT,
    },
    SUBARU: {
        FILE: 'subaru',
        DEFAULT: costume_type.DEFAULT,
    },
    MIO: {
        FILE: 'mio',
        DEFAULT: costume_type.DEFAULT,
    },
    PEKORA: {
        FILE: 'pekora',
        DEFAULT: costume_type.DEFAULT,
    },
    WATAME: {
        FILE: 'watame',
        DEFAULT: costume_type.DEFAULT,
    },
    POLKA: {
        FILE: 'polka',
        DEFAULT: costume_type.DEFAULT,
    },
    GURA: {
        FILE: 'gura',
        DEFAULT: costume_type.DEFAULT,
    }
}

// Display costume
function setCostume(_costume) {
    document.getElementById('full-illust').src = `assets/img/${currentMember['FILE']}/${_costume}.png`
}

// Add buttons for current member costumes to costume grid
function populateCostumeGrid() {
    let memberFile = currentMember['FILE']
    let costumeKey = Object.keys(costume).find(key => costume[key]['FILE'] === memberFile)
    let memberCostumes = costume[costumeKey]

    clearCostumeButtons()

    for (let i = 1; i < Object.keys(memberCostumes).length; i++) {
        let templateButton = document.createElement('button')
        let memberCostumeKey = Object.keys(memberCostumes)[i]
        let memberCostume = memberCostumes[memberCostumeKey]['FILE']
        let memberCostumeName = memberCostumes[memberCostumeKey][nameKey]

        templateButton.onclick = _ => {
            setCostume(memberCostume)
            playSoundEffect('btn-click')
        }

        templateButton.innerHTML = `<div class="background"></div>
        <picture>
            <source type="image/webp" srcset="assets/img/${memberFile}/${memberCostume}.webp">
            <source type="image/png" srcset="assets/img/${memberFile}/${memberCostume}.png">
            <img src="assets/img/${memberFile}/${memberCostume}.png" alt="${memberCostume}">
        </picture>
        <p class="tooltip bottom">${memberCostumeName}</p>`
        document.getElementById('costume-grid').appendChild(templateButton)
    }
}

// Clear buttons from costume grid
function clearCostumeButtons() {
    document.getElementById('costume-grid').innerHTML = ''
}