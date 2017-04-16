import express from 'express'
import bodyParser from 'body-parser'
import createCharacters from './routes/createCharacters'
import readCharacters from './routes/readCharacters'
import updateCharacters from './routes/updateCharacters'
import deleteCharacters from './routes/deleteCharacters'

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