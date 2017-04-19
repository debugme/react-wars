import Character from '../database/character.model'

const createCharacters = (request, response) => {
  if (Object.keys(request.body).length === 0)
    return response.status(422).end()
  new Character(request.body).save()
    .then(character => response.status(201).json(character))
    .catch(error => response.status(400).send(error.toString()))
}

export default createCharacters
