import { READ_CHARACTERS } from '../actions/readCharacters'

export function readCharacters(state = { characters: null }, action) {
  switch (action.type) {
  case READ_CHARACTERS:
    return { characters: action.payload }
  default:
    return state
  }
}

