import mongoose from 'mongoose'

const buildDatabase = (options) => {
  mongoose.Promise = global.Promise
  const databaseUri = options.mongodburi
  mongoose.connect(databaseUri)
  return mongoose
}

export default buildDatabase
