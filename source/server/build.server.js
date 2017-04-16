import express from 'express'
import bodyParser from 'body-parser'
import createCharacters from './create.characters'
import readCharacters from './read.characters'
import updateCharacters from './update.characters'
import deleteCharacters from './delete.characters'

const buildServer = (options) => {
  const instance = express()
  instance.use(bodyParser.json())
  instance.use(bodyParser.urlencoded({ extended: true }))
  instance.post('/characters', createCharacters)
  instance.get('/characters', readCharacters)
  instance.get('/characters/:_id', readCharacters)
  instance.delete('/characters/:_id', deleteCharacters)
  instance.patch('/characters/:_id', updateCharacters)
  const server = instance.listen(parseInt(options.port, 10))
  return server
}

export default buildServer