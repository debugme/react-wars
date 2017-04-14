import { Schema } from 'mongoose'

const data = {
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
  }
}

export default new Schema(data)