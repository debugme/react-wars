import dotenv from 'dotenv'
import path from 'path'

import buildDatabase from '../database/build.database'
import buildServer from './build.server'

const env = path.resolve('.env')
dotenv.config({ path: env })

buildDatabase(process.env)
buildServer(process.env)
