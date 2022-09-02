import 'express-async-errors'
import express, { json } from 'express'
import dotenv from 'dotenv'

import { Logger } from './domain'
import {
    ExpressAuthRouterFactory,
    ExpressErrorMiddlewareFactory,
    ExpressUserRouterFactory,
    MemoryUserRepository
} from './infrastructure'

dotenv.config()

const server = express()
const logger = new Logger()
const userRepository = new MemoryUserRepository()

const port = process.env.PORT || 3000

server.use(json())

server.use('/auth', ExpressAuthRouterFactory.create(userRepository))
server.use('/users', ExpressUserRouterFactory.create(userRepository))

// server.use(ExpressAccessTokenVerificationMiddlewareFactory.create())
server.use(ExpressErrorMiddlewareFactory.create(logger))

server.listen(port, () => {
    logger.log(`Server started at port ${port}`)
})