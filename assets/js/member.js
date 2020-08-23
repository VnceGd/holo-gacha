const member = {
    PEKORA: 'pekora',
    POLKA: 'polka'
}
const area = {
    HEAD: 'tap-head',
    CHEST: 'tap-chest'
}

let currentMember = member.POLKA

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