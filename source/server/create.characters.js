import Character from '../database/character.model'

const createCharacters = (request, response) => {
  new Character(request.body).save()
    .then(() => response.status(201).end())
    .catch(error => response.status(400).send(error.toString()))
}

export default createCharacters
