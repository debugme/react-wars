import { GET_DATA } from '../actions/getData'

export function getData(state = { data: null }, action) {
  switch (action.type) {
  case GET_DATA:
    return { data: action.payload }
  default:
    return state
  }
}

