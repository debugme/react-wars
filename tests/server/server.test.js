import _ from 'lodash'
import path from 'path'
import dotenv from 'dotenv'
import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiAsPromised from 'chai-as-promised'

import characters from './server.test.json'
import Character from '../../source/database/models/Character'
import buildServer from '../../source/server/buildServer'
import buildDatabase from '../../source/database/buildDatabase'

describe('server route handling', () => {

  let testDatabase = null
  let mockServer = null
  let testServer = null

  beforeAll(() => {
    chai.use(chaiHttp)
    chai.use(chaiAsPromised)
    dotenv.config({ path: path.resolve(__dirname, '..', '.env') })
    testServer = buildServer(process.env)
    mockServer = chai.request(testServer)
    testDatabase = buildDatabase(process.env)
  })

  afterAll((done) => {
    Character.collection.remove()
      .then(() => testServer.close())
      .then(() => testDatabase.disconnect(done))
  })

  describe('create character with POST /characters', () => {

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

  describe('read characters with GET /characters', () => {

    beforeAll((done) => {
      Character.collection.remove().then(done)
    })

    beforeEach((done) => {
      Character.insertMany(characters).then(done)
    })

    afterEach((done) => {
      Character.collection.remove().then(done)
    })

    it('should return all characters in JSON format', (done) => {
      const keys = Object.keys(characters[0])
      const byName = (a, b) => a.name.localeCompare(b.name)
      const getData = data => _.pick(data, keys)
      const expectData = characters.sort(byName)
      mockServer.get('/characters')
        .then((response) => {
          const actualData = response.body.sort(byName).map(getData)
          expect(actualData).toEqual(expectData)
          expect(response.status).toBe(200)
          done()
        })
    })

    it('should return requested character in JSON format', (done) => {
      const name = characters[0].name
      const keys = Object.keys(characters[0])
      const getData = data => _.pick(data, keys)
      const expectData = characters[0]
      Character.findOne({ name })
        .then(data => mockServer.get(`/characters/${data._id}`))
        .then((response) => getData(response.body[0]))
        .then(actualData => expect(actualData).toEqual(expectData))
        .then(done)
    })

    it('should return error for invalid requested character', (done) => {
      mockServer.get('/characters/banana')
        .catch((error) => {
          expect(error.response.error.status).toBe(400)
          expect(error.response.error.toString()).toBe('Error: cannot GET /characters/banana (400)')
          done()
        })
    })

  })

  describe('update character with PATCH /characters', () => {

    beforeAll((done) => {
      Character.collection.remove().then(done)
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

  describe('delete character with DELETE /characters', () => {

    beforeAll((done) => {
      Character.collection.remove().then(done)
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
        .then(character => `/characters/${character._id}`)
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

})