import { Schema } from 'mongoose'

const details = {
  name: {
    type: String,
    required: true
  },
  hair_color: {
    type: String,
    required: false,
    default: 'unknown'
  },
  skin_color: {
    type: String,
    required: false,
    default: 'unknown'
  },
  eye_color: {
    type: String,
    required: false,
    default: 'unknown'
  },
  birth_year: {
    type: String,
    required: false,
    default: 'unknown'
  },
  height: {
    type: Number,
    required: false,
    default: 0
  },
  mass: {
    type: Number,
    required: false,
    default: 0
  },
  is_male: {
    type: Boolean,
    required: true
  },
  is_favorite: {
    type: Boolean,
    required: true,
    default: false
  }
}

const options = {
  collection: 'Characters'
}

const schema = new Schema(details, options)

export default schema
