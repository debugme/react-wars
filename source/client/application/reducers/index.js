import { combineReducers } from 'redux'

import { readCharacters } from './readCharacters'

export default combineReducers({
  characters: readCharacters
})
