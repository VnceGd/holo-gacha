// Add buttons for character voicelines from json object
function populateVoicelines() {
    let memberFile = currentMember['FILE']
    let voicelineObj = `assets/audio/${memberFile}/voicelines.json`
    let request = new XMLHttpRequest()

    request.open('GET', voicelineObj, true)

    request.onload = _ => {
        if (request.status >= 200 && request.status < 400) {
            let data = JSON.parse(request.responseText)

            clearVoicelineButtons()

            Object.entries(data).forEach(([key, value]) => {
                let templateButton = document.createElement('button')
        
                templateButton.onclick = _ => { playAudioClip(currentMember, key) }
        
                templateButton.innerHTML = `${value}`
                document.getElementById('voiceline-list').appendChild(templateButton)
            })
        }
        else {
            voicelinesError()
        }
    }

    request.onerror = _ => {
        voicelinesError()
    }

    request.send()
}

// Clear button elements from grid
function clearVoicelineButtons() {
    document.getElementById('voiceline-list').innerHTML = ''
}

// Display error message
function voicelinesError() {
    document.getElementById('voiceline-list').innerHTML = 'No voicelines found.'
}