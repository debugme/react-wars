import Character from '../database/character.model'

const deleteCharacters = (request, response) => {
  const _id = request.params._id
  Character.findByIdAndRemove(_id)
    .then(() => response.json({ _id }))
    .catch(() => response.status(404).end())
}

export default deleteCharacters
