import { Router } from 'express'

import { ExpressUserController } from '../../api'
import {
    EmailUniquenessChecker, IdUniquenessChecker,
    IUserRepositoryReader,
    IUserRepositoryWriter,
    UserCreationCommandHandler
} from '../../application'
import { BcryptHasherHandler } from '../BcryptHasherHandler'
import { UuidIdHandler } from '../memory'

export class ExpressUserRouterFactory {
    static create(
        userRepository: IUserRepositoryReader & IUserRepositoryWriter
    ) {
        const router = Router()
        const idHandler = new UuidIdHandler()
        const idUniquenessChecker = new IdUniquenessChecker(userRepository)
        const emailUniquenessChecker = new EmailUniquenessChecker(userRepository)
        const hashHandler = BcryptHasherHandler.create()
        const userCreationCommandHandler = new UserCreationCommandHandler(
            idHandler,
            idUniquenessChecker,
            emailUniquenessChecker,
            hashHandler,
            userRepository
        )
        const userController = new ExpressUserController(userCreationCommandHandler)

        router.post('/', userController.post.bind(userController))

        return router
    }
}