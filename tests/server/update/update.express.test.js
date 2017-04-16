import path from 'path'
import dotenv from 'dotenv'
import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiAsPromised from 'chai-as-promised'

import characters from './update.data.json'
import Character from '../../../source/database/models/Character'
import buildServer from '../../../source/server/buildServer'
import buildDatabase from '../../../source/database/buildDatabase'

describe('update character with PATCH /characters', () => {

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

  beforeEach((done) => {
    Character.insertMany(characters).then(done)
  })

  afterEach((done) => {
    Character.collection.remove().then(done)
  })

  it('should update a character when correct data is provided', (done) => {
    const options = { name: characters[0].name }
    const updates = { hair_color: 'purple' }
    Character.findOne(options)
      .then(character => `/characters/${character._id}`)
      .then(query => mockServer.patch(query).send(updates))
      .then(data => {
        expect(data.status).toBe(200)
        return Character.findOne(options)
      })
      .then(data => data.hair_color)
      .then(color => expect(color).toBe(updates.hair_color))
      .then(done)
  })

  it('should not update a character when incorrect data is provided', (done) => {
    const options = { name: characters[0].name }
    const updates = { ear_color: 'purple' }
    Character.findOne(options)
      .then(character => `/characters/${character._id}`)
      .then(query => mockServer.patch(query).send(updates))
      .catch((error) => {
        expect(error.response.error.status).toBe(422)
        expect(error.response.error.toString().startsWith('Error: cannot PATCH /characters/'))
        done()
      })
  })

  it('should not update a character when no data is provided', (done) => {
    const options = { name: characters[0].name }
    Character.findOne(options)
      .then(character => `/characters/${character._id}`)
      .then(query => mockServer.patch(query))
      .catch((error) => {
        expect(error.response.error.status).toBe(422)
        expect(error.response.error.toString().startsWith('Error: cannot PATCH /characters/'))
        done()
      })
  })

})
