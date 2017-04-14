import _ from 'lodash'
import path from 'path'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import schema from '../../schemas/CharacterSchema'
import fields from './update.data.json'

describe('update existing document in characters collection', () => {

  let Character = null

  beforeAll((done) => {
    mongoose.Promise = global.Promise
    dotenv.config({ path: path.resolve(__dirname, '..', '.env') })
    const saveCharacter = () => new Character(fields).save()
    Character = mongoose.model('Characters', schema)
    mongoose.connect(process.env.mongodbUri)
      .then(saveCharacter)
      .then(done)
  })

  afterAll((done) => {
    Character.collection.remove()
      .then(() => mongoose.connection.close())
      .then(done)
  })

  it('should update a character if correct values are provided', (done) => {
    const match = { name: fields.name }
    const update = { hair_color: 'black'}
    const options = { new : true }
    const keys = Object.keys(fields)
    const check = (data) => expect(_.pick(data, keys)).toMatchSnapshot()
    Character.findOneAndUpdate(match, update, options)
      .then(check)
      .then(done)
  })

})