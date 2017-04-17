import 'whatwg-fetch'

export const CREATE_CHARACTERS = 'CREATE_CHARACTERS'

export function createCharacters(endpoint) {
  const type = CREATE_CHARACTERS
  const payload = fetch(endpoint).then(response => response.json())
  const action = { type, payload }
  return action
}
