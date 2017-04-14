import _ from 'lodash'
import path from 'path'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import schema from '../../schemas/CharacterSchema'
import fields from './create.data.json'

describe('create new document in characters collection', () => {

  let Character = null

  beforeAll((done) => {
    mongoose.Promise = global.Promise
    dotenv.config({ path: path.resolve(__dirname, '..', '.env') })
    const clearCollection = () => Character.collection.remove()
    Character = mongoose.model('Characters', schema)
    mongoose.connect(process.env.mongodbUri)
      .then(clearCollection)
      .then(done)
  })

  afterAll((done) => {
    Character.collection.remove()
      .then(() => mongoose.connection.close())
      .then(done)
  })

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
    const fields = { fruit: 'banana'}
    const check = (error) => expect(JSON.stringify(error)).toMatchSnapshot()
    new Character(fields).save()
      .catch(check)
      .then(done)
  })

})