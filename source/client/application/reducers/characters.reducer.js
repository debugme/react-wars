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
    const character = action.payload
    const newState = { ...state }
    for (let index = 0; index < newState.characters.length; ++index)
      if (newState.characters[index]._id === character._id) {
        console.log('STATE:UPDATE:BEFORE', newState.characters[index])
        newState.characters[index] = character
        console.log('STATE:UPDATE:AFTER', newState.characters[index])
        break
      }
    return newState

  }
  case DELETE_CHARACTERS:
  // ToDo...return a new state object
    return state
  default:
    return state
  }
}
