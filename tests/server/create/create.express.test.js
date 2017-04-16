import _ from 'lodash'
import path from 'path'
import dotenv from 'dotenv'
import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiAsPromised from 'chai-as-promised'

import characters from './create.data.json'
import Character from '../../../source/database/models/Character'
import buildServer from '../../../source/server/buildServer'
import buildDatabase from '../../../source/database/buildDatabase'

describe('create character with POST /characters', () => {

  let testDatabase = null
  let mockServer = null
  let testServer = null

  beforeAll(() => {
    chai.use(chaiHttp)
    chai.use(chaiAsPromised)
    dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') })
    testServer = buildServer(process.env)
    mockServer = chai.request(testServer)
    testDatabase = buildDatabase(process.env)
  })

  afterAll((done) => {
    Character.collection.remove()
      .then(() => testDatabase.disconnect())
      .then(() => testServer.close(done))
  })

  it('should create a character when correct data is provided', (done) => {
    mockServer.post('/characters')
      .send(characters[0])
      .then(data => {
        expect(data.status).toBe(201)
        return Character.findOne({ name: characters[0].name })
      })
      .then(data => _.pick(data, Object.keys(characters[0])))
      .then(character => expect(character).toEqual(characters[0]))
      .then(done)
  })

  it('should not create a character when no data is provided', (done) => {
    mockServer.post('/characters')
      .catch((error) => {
        expect(error.response.error.status).toBe(400)
        expect(error.response.error.toString()).toBe('Error: cannot POST /characters (400)')
        done()
      })
  })

})