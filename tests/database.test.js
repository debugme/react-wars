import _ from 'lodash'
import path from 'path'
import dotenv from 'dotenv'

import Character from '../source/database/character.model'
import buildDatabase from '../source/database/build.database'
import characters from './test.data.json'

describe('database operation handling', () => {

  let testDatabase = null

  beforeAll(() => {
    dotenv.config({ path: path.resolve(__dirname, '.env') })
    testDatabase = buildDatabase(process.env)
  })

  afterAll((done) => {
    Character.collection.remove()
      .then(() => testDatabase.disconnect(done))
  })

  describe('create new document in characters collection', () => {
    it('should allow creation of a character from correct data', (done) => {
      const { name } = characters[0]
      const keys = Object.keys(characters[0])
      const find = () => Character.findOne({ name })
      const check = (data) => expect(_.pick(data, keys)).toEqual(characters[0])
      new Character(characters[0]).save()
        .then(find)
        .then(check)
        .then(done)
    })

    it('should disallow creation of a character from incorrect data', (done) => {
      const fields = { fruit: 'banana' }
      const check = (error) => expect(Object.keys(error.errors).length > 0).toBe(true)
      new Character(fields).save()
        .catch(check)
        .then(done)
    })

  })

  describe('read document from characters collection', () => {

    it('should read the correct data for an existing character', (done) => {
      const { name } = characters[0]
      const keys = Object.keys(characters[0])
      const check = (data) => expect(_.pick(data, keys)).toEqual(characters[0])
      Character.findOne({ name })
        .then(check)
        .then(done)
    })

    it('should return null for a non-existent character', (done) => {
      const name = 'Boba Fett'
      const check = (data) => expect(data).toBe(null)
      Character.findOne({ name })
        .then(check)
        .then(done)
    })
  })

  describe('update existing document in characters collection', () => {

    it('should update a character if correct values are provided', (done) => {
      const match = { name: characters[0].name }
      const update = { hair_color: 'black' }
      const options = { new: true }
      const keys = Object.keys(characters[0])
      const changed = { ...characters[0], hair_color: 'black'}
      const check = (data) => expect(_.pick(data, keys)).toEqual(changed)
      Character.findOneAndUpdate(match, update, options)
        .then(check)
        .then(done)
    })
  })

  describe('delete document from characters collection', () => {

    it('should allow an existing character to be deleted', (done) => {
      const { name } = characters[0]
      const find = () => Character.findOne({ name })
      const check = (data) => expect(data).toBe(null)
      Character.findOneAndRemove({ name })
        .then(find)
        .then(check)
        .then(done)
    })

    it('should return null on delete of non-existent character', (done) => {
      const name = 'banana'
      const check = (data) => expect(data).toBe(null)
      Character.findOneAndRemove({ name })
        .then(check)
        .then(done)
    })

  })
})
