import _ from 'lodash'
import path from 'path'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import Character from '../../../source/database/models/Character'
import fields from './read.data.json'

describe('read document from characters collection', () => {

  beforeAll((done) => {
    mongoose.Promise = global.Promise
    dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') })
    const saveCharacter = () => new Character(fields).save()
    mongoose.connect(process.env.mongodbUri)
      .then(saveCharacter)
      .then(done)
  })

  afterAll((done) => {
    Character.collection.remove()
      .then(() => mongoose.connection.close())
      .then(done)
  })

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