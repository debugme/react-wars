import dotenv from 'dotenv'
import path from 'path'

import buildDatabase from './source/database/build.database'
import buildServer from './source/server/build.server'

const env = path.resolve('.env')
dotenv.config({ path: env })

process.env.PORT = process.env.PORT || 3000

const database = buildDatabase(process.env)
const server = buildServer(process.env)

database.connection.on('connected', () => {
  console.log('database connected')
})

database.connection.on('error', () => {
  console.log('database connection error')
})

database.connection.on('disconnected', () => {
  console.log('database disconnected')
})

process.on('SIGINT', () => {
  console.log('database disconnected due to application termination request')
  database.connection.close()
  console.log('server disconnected due to application termination request')
  server.close()
  process.exit(0)
})
