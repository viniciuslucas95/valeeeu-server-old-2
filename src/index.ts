import express from 'express'
import dotenv from 'dotenv'

import { Logger } from './domain'

dotenv.config()

const server = express()
const logger = new Logger()
const port = process.env.PORT || 3000

server.use('/', (_, res) => {
    res.json({ test: 'ok' })
})

server.listen(port, () => {
    logger.log(`Server started at port ${port}`)
})