import express, { json } from 'express'
import dotenv from 'dotenv'

import { Logger } from './domain'
import { ExpressUserRouterFactory } from './infrastructure'

dotenv.config()

const server = express()
const logger = new Logger()
const port = process.env.PORT || 3000

server.use(json())

server.use('/users', ExpressUserRouterFactory.create())

server.listen(port, () => {
    logger.log(`Server started at port ${port}`)
})