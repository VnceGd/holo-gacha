const member = {
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
    currentMember = _member
    document.getElementById('full-illust').src = `assets/img/${currentMember}/full.png`
    localStorage.setItem('member', _member)
}

// Set member and pause audio if necessary
function changeMember() {
    let inputMember = document.getElementById('member')

    setMember(inputMember.value)
    if (!currentAudio.paused) currentAudio.pause()
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