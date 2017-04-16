import mongoose from 'mongoose'

const buildDatabase = (options) => {
  mongoose.Promise = global.Promise
  const databaseUri = options.mongodbUri
  mongoose.connect(databaseUri)
  console.log(`database: ${databaseUri}`)

  mongoose.connection.on('connected', () => {
    console.log('database connected')
  })

  mongoose.connection.on('error', () => {
    console.log('database connection error')
  })

  mongoose.connection.on('disconnected', () => {
    console.log('database disconnected')
  })

  process.on('SIGINT', () => {
    console.log('database disconnected due to application termination request')
    mongoose.connection.close()
    process.exit(0)
  })

  return mongoose
}

export default buildDatabase
