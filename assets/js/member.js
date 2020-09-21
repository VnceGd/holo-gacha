const member = {
    AQUA: 'aqua',
    PEKORA: 'pekora',
    WATAME: 'watame',
    POLKA: 'polka',
    GURA: 'gura'
}
const area = {
    HEAD: 'tap-head',
    CHEST: 'tap-chest'
}
const sort = {
    GEN: 'gen',
    NAME: 'name'
}

let currentMember = member.POLKA
let currentSort = sort.GEN
let isMemberPopulated = false

// Update and cache member
function setMember(_member) {
    if (!currentAudio.paused) currentAudio.pause()

    currentMember = _member
    document.getElementById('full-illust').src = `assets/img/${_member}/full.png`
    localStorage.setItem('member', _member)
}

// Add buttons for each member to the member grid unless already populated
function populateMemberGrid() {
    if (isMemberPopulated) return

    generateButtons(Object.values(member))
    isMemberPopulated = true
}

// Sort member grid buttons based on select element value
function sortMemberGrid() {
    let memberArray = []
    let sortingMethod = document.getElementById('member-sort-select').value

    Object.values(member).forEach(m => {
        memberArray.push(m)
    })

    switch (sortingMethod) {
        case sort.NAME:
            if (currentSort == sort.NAME) return
            memberArray = memberArray.sort()
            break
        case sort.GEN:
            if (currentSort == sort.GEN) return
            break
    }

    document.getElementById('member-grid').innerHTML = ''
    generateButtons(memberArray)
    currentSort = sortingMethod
}

// Generate buttons for each element in the list
function generateButtons(_list) {
    _list.forEach(m => {
        let templateButton = document.createElement('button')

        templateButton.onclick = () => { setMember(m) }
        templateButton.innerHTML = `<div class="background"></div><img loading="lazy" src="assets/img/${m}/full.png">`
        document.getElementById('member-grid').appendChild(templateButton)
    })
}