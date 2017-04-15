import mongoose from 'mongoose'

const buildDatabase = (options) => {
  mongoose.Promise = global.Promise
  mongoose.connect(options.mongodbUri)
  return mongoose
}

export default buildDatabase