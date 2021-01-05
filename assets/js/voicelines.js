// Add buttons for character voicelines from json object
function populateVoicelines() {
    let memberFile = currentMember['FILE']

    fetch(`assets/audio/${memberFile}/voicelines.json`)
    .then(readObject)
    .then(parseVoicelines)
    .catch(voicelinesError)
}

// Generate voiceline buttons
function parseVoicelines(data) {
    clearPanelContent('voiceline-list')

    Object.entries(data).forEach(([key, value]) => {
        let templateButton = document.createElement('button')

        templateButton.onclick = _ => { playAudioClip(currentMember, key) }

        templateButton.innerHTML = `${value}`
        document.getElementById('voiceline-list').appendChild(templateButton)
    })
}

// Display error message
function voicelinesError() {
    document.getElementById('voiceline-list').innerHTML = 'No voice lines found.'
}