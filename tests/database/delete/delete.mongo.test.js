import path from 'path'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import Character from '../../../source/database/models/Character'
import fields from './delete.data.json'

describe('delete document from characters collection', () => {

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