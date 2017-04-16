import _ from 'lodash'
import path from 'path'
import dotenv from 'dotenv'
import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiAsPromised from 'chai-as-promised'

import characters from './read.data.json'
import Character from '../../../source/database/models/Character'
import buildServer from '../../../source/server/buildServer'
import buildDatabase from '../../../source/database/buildDatabase'

describe('read characters with GET /characters', () => {

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

  it('read.express.test.js', () => {
    expect(true).toBe(true)
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