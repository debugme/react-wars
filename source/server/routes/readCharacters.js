import Character from '../../database/models/Character'

const readCharacters = (request, response, next) => {
  const { _id } = request.params
  const query = _id ? { _id } : { }
  Character.find(query)
    .then((items) => {
      response.json(items)
    })
    .catch(error => {
      response.status(400)
      response.send(error.toString())
      next()
    })
}

export default readCharacters