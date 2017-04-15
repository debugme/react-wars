import path from 'path'
import dotenv from 'dotenv'
import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiAsPromised from 'chai-as-promised'

import characters from './delete.data.json'
import Character from '../../../source/database/models/Character'
import buildServer from '../../../source/server/buildServer'
import buildDatabase from '../../../source/database/buildDatabase'

describe('delete character with DELETE /characters', () => {

  let testDatabase = null
  let mockServer = null
  let testServer = null

  beforeAll(() => {
    chai.use(chaiHttp)
    chai.use(chaiAsPromised)
    dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') })
    testDatabase = buildDatabase(process.env)
    testServer = buildServer(process.env)
    mockServer = chai.request(testServer)
  })

  afterAll((done) => {
    Character.collection.remove()
      .then(() => testDatabase.connection.close())
      .then(() => testServer.close())
      .then(done)
  })

  beforeEach((done) => {
    Character.insertMany(characters).then(done)
  })

  afterEach((done) => {
    Character.collection.remove().then(done)
  })

  it('should delete character whose id is supplied', (done) => {
    const options = { name: characters[0].name }
    Character.findOne(options)
      .then(character => Promise.resolve(`/characters/${character._id}`))
      .then(query => mockServer.delete(query))
      .then(response => {
        expect(response.status).toBe(204)
        Character.findOne(options)
          .then(character => {
            expect(character).toBe(null)
            done()
          })
      })
  })

  it('should return error status if invalid id is supplied', (done) => {
    mockServer.delete('/characters/banana')
      .catch((error) => {
        expect(error.response.error.status).toBe(404)
        expect(error.response.error.toString()).toBe('Error: cannot DELETE /characters/banana (404)')
        done()
      })
  })

})