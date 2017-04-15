import express from 'express'
import deleteCharacters from './routes/deleteCharacters'
import readCharacters from './routes/readCharacters'

const buildServer = (options) => {
  const instance = express()
  // server.post('/characters', createCharacters)
  instance.get('/characters', readCharacters)
  instance.get('/characters/:_id', readCharacters)
  instance.delete('/characters/:_id', deleteCharacters)
  // // instance.patch('/characters/:_id', updateCharacter)
  const server = instance.listen(options.port)
  return server
}

export default buildServer