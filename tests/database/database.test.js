import _ from 'lodash'
import path from 'path'
import dotenv from 'dotenv'

import Character from '../../source/database/models/Character'
import buildDatabase from '../../source/database/buildDatabase'
import fields from './database.test.json'

describe('database operation handling', () => {

  let testDatabase = null

  beforeAll(() => {
    dotenv.config({ path: path.resolve(__dirname, '..', '.env') })
    testDatabase = buildDatabase(process.env)
  })

  afterAll((done) => {
    Character.collection.remove()
      .then(() => testDatabase.disconnect(done))

  })

  describe('create new document in characters collection', () => {
    it('should allow creation of a character from correct data', (done) => {
      const { name } = fields
      const keys = Object.keys(fields)
      const find = () => Character.findOne({ name })
      const check = (data) => expect(_.pick(data, keys)).toMatchSnapshot()
      new Character(fields).save()
        .then(find)
        .then(check)
        .then(done)
    })

    it('should disallow creation of a character from incorrect data', (done) => {
      const fields = { fruit: 'banana' }
      const check = (error) => expect(JSON.stringify(error)).toMatchSnapshot()
      new Character(fields).save()
        .catch(check)
        .then(done)
    })

  })

  describe('read document from characters collection', () => {

    it('should read the correct data for an existing character', (done) => {
      const { name } = fields
      const keys = Object.keys(fields)
      const check = (data) => expect(_.pick(data, keys)).toMatchSnapshot()
      Character.findOne({ name })
        .then(check)
        .then(done)
    })

    it('should return null for a non-existent character', (done) => {
      const name = 'Boba Fett'
      const check = (data) => expect(data).toMatchSnapshot()
      Character.findOne({ name })
        .then(check)
        .then(done)
    })
  })

  describe('update existing document in characters collection', () => {

    it('should update a character if correct values are provided', (done) => {
      const match = { name: fields.name }
      const update = { hair_color: 'black' }
      const options = { new: true }
      const keys = Object.keys(fields)
      const check = (data) => expect(_.pick(data, keys)).toMatchSnapshot()
      Character.findOneAndUpdate(match, update, options)
        .then(check)
        .then(done)
    })


  })

  describe('delete document from characters collection', () => {

    it('should allow an existing character to be deleted', (done) => {
      const { name } = fields
      const find = () => Character.findOne({ name })
      const check = (data) => expect(data).toMatchSnapshot()
      Character.findOneAndRemove({ name })
        .then(find)
        .then(check)
        .then(done)
    })

    it('should return null on delete of non-existent character', (done) => {
      const name = 'banana'
      const check = (data) => expect(data).toMatchSnapshot()
      Character.findOneAndRemove({ name })
        .then(check)
        .then(done)
    })

  })
})