const member = {
    AQUA: 'aqua',
    GURA: 'gura',
    PEKORA: 'pekora',
    POLKA: 'polka',
    WATAME: 'watame'
}
const area = {
    HEAD: 'tap-head',
    CHEST: 'tap-chest'
}

let currentMember = member.POLKA
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

    Object.values(member).forEach(m => {
        let templateButton = document.createElement('button')

        templateButton.onclick = () => { setMember(m) }
        templateButton.innerHTML = `<div class="background"></div><img loading="lazy" src="assets/img/${m}/full.png">`
        document.getElementById('member-grid').appendChild(templateButton)
    })

    isMemberPopulated = true
}