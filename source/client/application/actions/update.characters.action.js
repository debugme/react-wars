import 'whatwg-fetch'

export const UPDATE_CHARACTERS = 'UPDATE_CHARACTERS'

export function updateCharacters(endpoint, _id, fields) {
  console.log('ACTION: update_characters')
  const type = UPDATE_CHARACTERS
  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify(fields)
  }
  const payload = fetch(endpoint, options)
    .then(response => {
      if (response.status === 200)
        return { _id: _id, ...fields }
      else
        return null
    })
  const action = { type, payload }
  return action
}
