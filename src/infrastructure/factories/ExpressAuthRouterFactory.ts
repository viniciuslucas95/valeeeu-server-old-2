import { Router } from 'express'

import { ExpressAuthController } from '../../api'
import {
    IUserRepositoryReader, IUserRepositoryWriter,
    LoginCommandHandler
} from '../../application'
import { BcryptHasherHandler } from '../BcryptHasherHandler'
import { JwtTokenHandler } from '../JwtTokenHandler'
import { UuidIdHandler } from '../memory'
import { EnvError } from './EnvError'

export class ExpressAuthRouterFactory {
    static create(
        userRepository: IUserRepositoryReader & IUserRepositoryWriter
    ) {
        const router = Router()
        const idHandler = new UuidIdHandler()
        const hashHandler = BcryptHasherHandler.create()
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
        const tokenHandler = new JwtTokenHandler()

        if (!accessTokenSecret) throw new EnvError('Access token')
        if (!refreshTokenSecret) throw new EnvError('Refresh token')

        const loginCommandHandler = new LoginCommandHandler(
            tokenHandler,
            userRepository,
            hashHandler,
            accessTokenSecret,
            refreshTokenSecret,
            idHandler
        )
        const authController = new ExpressAuthController(loginCommandHandler)

        router.post('/login', authController.post.bind(authController))

        return router
    }
}