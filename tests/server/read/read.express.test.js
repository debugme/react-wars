import _ from 'lodash'
import path from 'path'
import dotenv from 'dotenv'
import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiAsPromised from 'chai-as-promised'
import mongoose from 'mongoose'

import characters from './read.data.json'
import Character from '../../../source/database/Character'
import buildServer from '../../../source/server/buildServer'

describe('read characters with GET /characters', () => {

  let testServer = null

  beforeAll(() => {
    chai.use(chaiHttp)
    chai.use(chaiAsPromised)
    dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') })
    testServer = chai.request(buildServer(process.env))
  })

  afterAll((done) => {
    Character.collection.remove()
      .then(() => mongoose.connection.close())
      .then(done)
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
    testServer.get('/characters')
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
      .then(data => testServer.get(`/characters/${data._id}`))
      .then((response) => getData(response.body[0]))
      .then(actualData => expect(actualData).toEqual(expectData))
      .then(done)
  })

  it('should return error for invalid requested character', (done) => {
    testServer.get('/characters/banana')
      .catch((error) => {
        expect(error.response.error.status).toBe(400)
        expect(error.response.error.toString()).toBe('Error: cannot GET /characters/banana (400)')
        done()
      })
  })

})