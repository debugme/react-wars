import { combineReducers } from 'redux'

import { characters } from 'CharactersReducer'

export default combineReducers({
  characters: characters,
})
