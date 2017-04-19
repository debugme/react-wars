import { CREATE_CHARACTERS } from 'CreateAction'
import { READ_CHARACTERS } from 'ReadAction'
import { UPDATE_CHARACTERS } from 'UpdateAction'
import { DELETE_CHARACTERS } from 'DeleteAction'

export function characters(state = { characters: null }, action) {

  switch (action.type) {
  case CREATE_CHARACTERS: {
    const character = action.payload
    const characters = { ...state.characters }
    characters[character._id] = character
    return { characters }
  }
  case READ_CHARACTERS: {
    return { characters: action.payload }
  }
  case UPDATE_CHARACTERS: {
    const character = action.payload
    const characters = { ...state.characters }
    characters[character._id] = character
    return { characters }
  }
  case DELETE_CHARACTERS: {
    const _id = action.payload._id
    const characters = { ...state.characters }
    delete characters[_id]
    return { characters }
  }
  default:
    return state
  }
}
