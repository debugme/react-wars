import { CREATE_CHARACTERS } from 'CreateAction'
import { READ_CHARACTERS } from 'ReadAction'
import { UPDATE_CHARACTERS } from 'UpdateAction'
import { DELETE_CHARACTERS } from 'DeleteAction'

export function characters(state = { characters: null }, action) {

  switch (action.type) {
  case CREATE_CHARACTERS:
    // ToDo...return a new state object
    return state
  case READ_CHARACTERS:
    return { characters: action.payload }
  case UPDATE_CHARACTERS: {
    const characters = []
    for (let index = 0; index < state.characters.length; ++index)
      if (state.characters[index]._id === action.payload._id)
        characters.push(action.payload)
      else
        characters.push(state.characters[index])
    return { characters }
  }
  case DELETE_CHARACTERS:
  // ToDo...return a new state object
    return state
  default:
    return state
  }
}
