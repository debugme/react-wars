import Character from '../database/character.model'

const deleteCharacters = (request, response) => {
  Character.findByIdAndRemove(request.params._id)
    .then(() => response.status(204).end())
    .catch(() => response.status(404).end())
}

export default deleteCharacters