import mongoose from 'mongoose'
import schema from './character.schema'

const model = mongoose.model('Characters', schema)

export default model
