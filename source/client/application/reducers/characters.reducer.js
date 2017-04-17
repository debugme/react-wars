import { CREATE_CHARACTERS } from 'CreateAction'
import { READ_CHARACTERS } from 'ReadAction'
import { UPDATE_CHARACTERS } from 'UpdateAction'
import { DELETE_CHARACTERS } from 'DeleteAction'

export function characters(state = { characters: null }, action) {
  console.log('REDUCER', action)
  switch (action.type) {
  case CREATE_CHARACTERS:
    // ToDo...return a new state object
    return state
  case READ_CHARACTERS:
    return { characters: action.payload }
  case UPDATE_CHARACTERS:
    // ToDo...return a new state object
    return state
  case DELETE_CHARACTERS:
  // ToDo...return a new state object
    return state
  default:
    return state
  }
}
