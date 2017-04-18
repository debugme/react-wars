import Character from '../database/character.model'

const readCharacters = (request, response, next) => {
  const { _id } = request.params
  const query = _id ? { _id } : { }
  Character.find(query)
    .then((items) => {
      const itemSet = {}
      const reducer = (set, val) => {
        set[val._id] = val
        return set
      }
      items.reduce(reducer, itemSet)
      response.json(itemSet)
    })
    .catch(error => {
      response.status(400)
      response.send(error.toString())
      next()
    })
}

export default readCharacters
