import 'whatwg-fetch'

export const GET_DATA = 'GET_DATA'

export function getData(url) {
  return {
    type: GET_DATA,
    payload: fetch(url).then(response => response.json())
  }
}
