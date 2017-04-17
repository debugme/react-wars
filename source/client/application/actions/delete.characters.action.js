import 'whatwg-fetch'

export const DELETE_CHARACTERS = 'DELETE_CHARACTERS'

export function deleteCharacters(endpoint) {
  const type = DELETE_CHARACTERS
  const payload = fetch(endpoint).then(response => response.json())
  const action = { type, payload }
  return action
}
