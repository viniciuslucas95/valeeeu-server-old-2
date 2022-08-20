import { sign } from 'jsonwebtoken'

import { IIdHandler, ITokenHandler } from '../domain'

export class JwtTokenHandler implements ITokenHandler {
    generate(
        payload: object,
        secret: string,
        daysToExpire: number,
        idHandler: IIdHandler
    ) {
        return sign(payload, secret, {
            expiresIn: `${daysToExpire}d`,
            jwtid: idHandler.generate()
        })
    }
}