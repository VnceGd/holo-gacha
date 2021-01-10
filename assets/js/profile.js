// Add list of character profile details from json object
function populateProfileList() {
  let memberFile = currentMember['FILE']

  fetch(`assets/profile/${currentLang}/${memberFile}.json`)
    .then(readObject)
    .then(parseProfile)
    .catch(profileError)
}

// Generate profile
function parseProfile(data) {
  let profileList = document.getElementById('profile-list')
  let details = document.createElement('table')
  let namePlate = document.createElement('h3')

  clearPanelContent('profile-list')

  namePlate.innerHTML = currentMember[nameKey]
  profileList.appendChild(namePlate)

  Object.entries(data).forEach(([key, value]) => {
    switch (key) {
      case 'Bio':
        let templateBio = document.createElement('p')

        templateBio.innerHTML = `${value}`
        profileList.appendChild(templateBio)
        break
      case 'Details':
        Object.entries(data[key]).forEach(([key, value]) => {
          let templateListItem = document.createElement('tr')

          templateListItem.innerHTML = `<td>${key}</td><td>${value}</td>`
          details.appendChild(templateListItem)
        })
        profileList.appendChild(details)
        break
      case 'Media':
        Object.entries(data[key]).forEach(([key, value]) => {
          let templateMediaButton = document.createElement('button')

          templateMediaButton.innerHTML = key
          templateMediaButton.onclick = () => {
            window.open(value)
          }
          profileList.appendChild(templateMediaButton)
        })
        break
      case 'Sources':
        let entries = Object.entries(data[key])
        let sourceContainer = document.createElement('div')

        sourceContainer.style.margin = '.25rem 0'
        sourceContainer.style.fontSize = '.75rem'
        sourceContainer.innerHTML = 'Sources: '
        entries.forEach(([key, value], index) => {
          let templateSourceLink = document.createElement('a')

          templateSourceLink.innerHTML = key
          templateSourceLink.href = value
          sourceContainer.appendChild(templateSourceLink)
          if (index < entries.length - 1) sourceContainer.innerHTML += ', '
        })
        profileList.appendChild(sourceContainer)
      default:
        break
    }
  })
}

// Display error message
function profileError() {
  document.getElementById('profile-list').innerHTML = 'No profile data found.'
}
