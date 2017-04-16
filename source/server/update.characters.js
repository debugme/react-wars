import Character from '../database/character.model'

const updateCharacters = (request, response, next) => {
  if (Object.keys(request.body).length === 0)
    return response.status(422).end()
  Character.findByIdAndUpdate(request.params._id, request.body)
    .then((data) => {
      const mismatches = Object.keys(request.body).find((value) => data[value] === undefined)
      if (mismatches)
        return response.status(422).end()
      response.status(200).end()
    })
    .catch(error => {
      response.status(400)
      response.send(error.toString())
      next()
    })
}

export default updateCharacters
