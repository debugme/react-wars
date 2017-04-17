import 'whatwg-fetch'

export const READ_CHARACTERS = 'READ_CHARACTERS'

export function readCharacters(endpoint) {
  const type = READ_CHARACTERS
  const payload = fetch(endpoint).then(response => response.json())
  const action = { type, payload }
  return action
}
