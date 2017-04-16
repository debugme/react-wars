import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import createCharacters from './create.characters'
import readCharacters from './read.characters'
import updateCharacters from './update.characters'
import deleteCharacters from './delete.characters'

const buildServer = (options) => {
  const instance = express()
  const root = path.resolve('./build/client')
  instance.use(express.static(root))
  instance.use(bodyParser.json())
  instance.use(bodyParser.urlencoded({ extended: true }))
  instance.post('/characters', createCharacters)
  instance.get('/characters', readCharacters)
  instance.get('/characters/:_id', readCharacters)
  instance.delete('/characters/:_id', deleteCharacters)
  instance.patch('/characters/:_id', updateCharacters)
  instance.get('/*', (request, response) => response.sendFile('index.html', { root }))
  const port = parseInt(options.port, 10)
  const done = () => console.log(`server: http://localhost:${port}`)
  const server = instance.listen(port, done)
  return server
}

export default buildServer
