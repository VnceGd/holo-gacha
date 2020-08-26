const member = {
    AQUA: 'aqua',
    PEKORA: 'pekora',
    POLKA: 'polka',
    WATAME: 'watame'
}
const area = {
    HEAD: 'tap-head',
    CHEST: 'tap-chest'
}

let currentMember = member.POLKA
let isGridPopulated = false

// Update and cache member
function setMember(_member) {
    if (!currentAudio.paused) currentAudio.pause()

    currentMember = _member
    document.getElementById('full-illust').src = `assets/img/${_member}/full.png`
    localStorage.setItem('member', _member)
}

// Add buttons for each member to the member grid unless already populated
function populateMemberGrid() {
    if (isGridPopulated) return

    Object.values(member).forEach(m => {
        let templateButton = document.createElement('button')

        templateButton.onclick = () => { setMember(m) }
        templateButton.innerHTML = `<img src="assets/img/${m}/full.png">`
        document.getElementById('member-grid').appendChild(templateButton)
    })

    isGridPopulated = true
}