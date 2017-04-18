import 'whatwg-fetch'

export const DELETE_CHARACTERS = 'DELETE_CHARACTERS'

export function deleteCharacters(endpoint) {
  const type = DELETE_CHARACTERS
  const options = { method: 'DELETE' }
  const payload = fetch(endpoint, options).then(response => response.json())
  const action = { type, payload }
  return action
}
