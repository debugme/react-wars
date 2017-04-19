import 'whatwg-fetch'

export const CREATE_CHARACTERS = 'CREATE_CHARACTERS'

export function createCharacters(endpoint, fields) {
  const type = CREATE_CHARACTERS
  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(fields)
  }
  const payload = fetch(endpoint, options).then(response => response.json())
  const action = { type, payload }
  return action
}
