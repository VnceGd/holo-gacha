const member = { // Ordered by debut date
    SORA: {
        FILE: 'sora',
        NAME_EN: 'Tokino Sora',
        NAME_JP: 'ときの そら',
        OWNED: false
    },
    ROBOCO: {
        FILE: 'roboco',
        NAME_EN: 'Roboco',
        NAME_JP: 'ロボ子',
        OWNED: false
    },
    MIKO: {
        FILE: 'miko',
        NAME_EN: 'Sakura Miko',
        NAME_JP: 'さくら みこ',
        OWNED: false
    },
    // SUISEI: {
    //     FILE: 'suisei',
    //     NAME_EN: 'Hoshimachi Suisei',
    //     NAME_JP: '星街 すいせい',
    //     OWNED: false
    // },
    MEL: {
        FILE: 'mel',
        NAME_EN: 'Yozora Mel',
        NAME_JP: '夜空 メル',
        OWNED: false
    },
    FUBUKI: {
        FILE: 'fubuki',
        NAME_EN: 'Shirakami Fubuki',
        NAME_JP: '白上 フブキ',
        OWNED: false
    },
    MATSURI: {
        FILE: 'matsuri',
        NAME_EN: 'Natsuiro Matsuri',
        NAME_JP: '夏色 まつり',
        OWNED: false
    },
    ROSENTHAL: {
        FILE: 'rosenthal',
        NAME_EN: 'Aki Rosenthal',
        NAME_JP: 'アキ ローゼンタール',
        OWNED: false
    },
    HAATO: {
        FILE: 'haato',
        NAME_EN: 'Akai Haato',
        NAME_JP: '赤井 はあと',
        OWNED: false
    },
    AQUA: {
        FILE: 'aqua',
        NAME_EN: 'Minato Aqua',
        NAME_JP: '湊 あくあ',
        OWNED: false
    },
    SHION: {
        FILE: 'shion',
        NAME_EN: 'Murasaki Shion',
        NAME_JP: '紫咲 シオン',
        OWNED: false
    },
    AYAME: {
        FILE: 'ayame',
        NAME_EN: 'Nakiri Ayame',
        NAME_JP: '百鬼 あやめ',
        OWNED: false
    },
    CHOCO: {
        FILE: 'choco',
        NAME_EN: 'Yuzuki Choco',
        NAME_JP: '癒月 ちょこ',
        OWNED: false
    },
    SUBARU: {
        FILE: 'subaru',
        NAME_EN: 'Oozora Subaru',
        NAME_JP: '大空 スバル',
        OWNED: false
    },
    MIO: {
        FILE: 'mio',
        NAME_EN: 'Ookami Mio',
        NAME_JP: '大神 ミオ',
        OWNED: false
    },
    PEKORA: {
        FILE: 'pekora',
        NAME_EN: 'Usada Pekora',
        NAME_JP: '兎田 ぺこら',
        OWNED: true
    },
    WATAME: {
        FILE: 'watame',
        NAME_EN: 'Tsunomaki Watame',
        NAME_JP: '角巻 わため',
        OWNED: true
    },
    POLKA: {
        FILE: 'polka',
        NAME_EN: 'Omaru Polka',
        NAME_JP: '尾丸 ポルカ',
        OWNED: true
    },
    GURA: {
        FILE: 'gura',
        NAME_EN: 'Gawr Gura',
        NAME_JP: 'がうる ぐら',
        OWNED: true
    }
}
const area = {
    HEAD: 'tap-head',
    CHEST: 'tap-chest'
}
const sort = {
    GEN: 'gen',
    SNAME: 'surname',
    GNAME: 'givenname'
}
const sortOrder = {
    ASCEND: 'ascend',
    DESCEND: 'descend'
}

let memberArray = []
let currentMember = member.POLKA
let currentSort = sort.GEN
let currentSortOrder = sortOrder.ASCEND
let isMemberPopulated = false

// Update and cache member
function setMember(_member) {
    let memberFile = _member['FILE']
    let fullIllust = document.getElementById('full-illust')
    stopAudio()

    currentMember = _member
    fullIllust.src = `assets/img/${memberFile}/full.webp`
    fullIllust.onerror = _ => {
        fullIllust.src = `assets/img/${memberFile}/full.png`
    }
    localStorage.setItem('member', memberFile)
}

// Add buttons for each member to the member grid unless already populated
function populateMemberGrid() {
    if (isMemberPopulated) clearButtons()

    let sortingOrderChecked = document.getElementById('member-sort-order').checked

    if (sortingOrderChecked) {
        document.getElementById("sort-order-txt").innerHTML = 'Descending'
        currentSortOrder = sortOrder.DESCEND
    }
    else {
        document.getElementById("sort-order-txt").innerHTML = 'Ascending'
        currentSortOrder = sortOrder.ASCEND
    }

    sortMemberGrid()
    isMemberPopulated = true
}

// Sort member grid buttons based on select element value
function sortMemberGrid() {
    memberArray = []
    let sortingMethod = document.getElementById('member-sort-select').value

    for (const key in member) {
        if (member.hasOwnProperty(key)) {
            memberArray.push(member[key][nameKey])
        }
    }

    if (currentSort != sortingMethod) {
        switch (sortingMethod) {
            case sort.SNAME:
                memberArray = memberArray.sort()
                break
            case sort.GNAME:
                memberArray = memberArray.sort((a,b) => {
                    // https://stackoverflow.com/a/24173473
                    return a.split(" ").pop()[0] > b.split(" ").pop()[0]
                })
                break
            case sort.GEN:
            default:
                break
        }
    }

    clearButtons()

    if (currentSortOrder == sortOrder.ASCEND) {
        generateButtons(memberArray)
    }
    else {
        generateButtons(memberArray.reverse())
    }

    currentSort = sortingMethod
}

// Reverse the order of the member buttons
function reverseSortOrder() {
    clearButtons()
    generateButtons(memberArray.reverse())

    if (currentSortOrder == sortOrder.ASCEND) {
        document.getElementById("sort-order-txt").innerHTML = 'Descending'
        currentSortOrder = sortOrder.DESCEND
    }
    else {
        document.getElementById("sort-order-txt").innerHTML = 'Ascending'
        currentSortOrder = sortOrder.ASCEND
    }
}

// Generate buttons for each element in the list
function generateButtons(_list) {
    _list.forEach(m => {
        let templateButton = document.createElement('button')
        let memberKey = Object.keys(member).find(key => member[key][nameKey] === m)
        let memberFile = member[memberKey]['FILE']
        let memberName = member[memberKey][nameKey]
        let memberOwned = member[memberKey]['OWNED']

        if (memberOwned) {
            templateButton.onclick = _ => {
                setMember(member[memberKey])
                playSoundEffect('btn-click')
            }
        }
        else {
            templateButton.className = 'locked'
            templateButton.onclick = _ => {
                playSoundEffect('btn-disabled')
            }
        }

        templateButton.innerHTML = `<div class="background"></div>
            <picture>
                <source type="image/webp" srcset="assets/img/${memberFile}/full.webp">
                <source type="image/png" srcset="assets/img/${memberFile}/full.png">
                <img src="assets/img/${memberFile}/full.png" alt="${memberFile}">
            </picture>
            <p class="tooltip bottom">${memberName}</p>`
        document.getElementById('member-grid').appendChild(templateButton)
    })
}

// Clear button elements from grid
function clearButtons() {
    document.getElementById('member-grid').innerHTML = ''
}