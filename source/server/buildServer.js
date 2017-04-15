import express from 'express'

import {readCharacters} from './routes/readCharacters'

const buildServer = (options) => {
  const { port} = options
  const server = express()
  // // server.post('/characters', createCharacter)
  server.get('/characters', readCharacters)
  server.get('/characters/:_id', readCharacters)
  // // server.patch('/characters/:id', updateCharacter)
  // // server.delete('/characters/:id', deleteCharacter)
  server.listen(port)
  return server
}

export default buildServer