import { ExpressAccessTokenVerificationMiddleware } from "../../api";
import { VerifyQueryHandler } from "../../application";
import { BcryptHasherHandler } from "../BcryptHasherHandler";
import { JwtTokenHandler } from "../JwtTokenHandler";
import { MemoryUserRepository } from "../memory";
import { EnvError } from "./EnvError";

export class ExpressAccessTokenVerificationMiddlewareFactory {
    static create() {
        const userRepository = new MemoryUserRepository()
        const hashHandler = BcryptHasherHandler.create()
        const tokenHandler = new JwtTokenHandler()
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

        if (!accessTokenSecret) throw new EnvError('Access token')

        const verifyQueryHandler = new VerifyQueryHandler(
            userRepository
            , tokenHandler,
            hashHandler,
            accessTokenSecret
        )

        const accessTokenVerificationMiddleware =
            new ExpressAccessTokenVerificationMiddleware(
                verifyQueryHandler
            )

        return accessTokenVerificationMiddleware.handle.bind(accessTokenVerificationMiddleware)
    }
}