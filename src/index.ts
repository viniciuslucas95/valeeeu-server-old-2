import 'express-async-errors'
import express, { json } from 'express'
import dotenv from 'dotenv'

import { Logger } from './domain'
import { ExpressUserRouterFactory } from './infrastructure'
import { ExpressErrorMiddleware } from './api'

dotenv.config()

const server = express()
const logger = new Logger()
const errorMiddleware = new ExpressErrorMiddleware(logger)
const port = process.env.PORT || 3000

server.use(json())

server.use('/users', ExpressUserRouterFactory.create())

server.use(errorMiddleware.handleError.bind(errorMiddleware))

server.listen(port, () => {
    logger.log(`Server started at port ${port}`)
})