import { Router } from 'express'

import { ExpressUserController } from '../../../api'
import { EmailUniquenessChecker, IdUniquenessChecker, UserCreationCommandHandler } from '../../../application'
import { BcryptHasherHandler } from '../../bcrypt'
import { MemoryUserRepository } from '../../user-repository'
import { UuidIdHandler } from '../../uuid'

export class ExpressUserRouterFactory {
    static create() {
        const router = Router()
        const userRepository = new MemoryUserRepository()
        const idGenerator = new UuidIdHandler()
        const idUniquenessChecker = new IdUniquenessChecker(userRepository)
        const emailUniquenessChecker = new EmailUniquenessChecker(userRepository)
        const passwordHandler = BcryptHasherHandler.create()
        const userCreationCommandHandler = new UserCreationCommandHandler(
            idGenerator,
            idUniquenessChecker,
            emailUniquenessChecker,
            passwordHandler,
            userRepository
        )
        const userController = new ExpressUserController(userCreationCommandHandler)

        router.post('/', userController.post.bind(userController))

        return router
    }
}