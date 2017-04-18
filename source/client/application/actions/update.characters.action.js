import 'whatwg-fetch'

export const UPDATE_CHARACTERS = 'UPDATE_CHARACTERS'

export function updateCharacters(endpoint, _id, fields) {
  const type = UPDATE_CHARACTERS
  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify(fields)
  }

  const payload = fetch(endpoint, options).then(response => response.json())
  const action = { type, payload }
  return action
}
