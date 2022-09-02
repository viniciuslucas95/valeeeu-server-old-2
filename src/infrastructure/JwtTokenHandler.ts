import { sign, verify as jwtVerify } from 'jsonwebtoken'

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

    verify<T extends object>(token: string, secret: string) {
        return jwtVerify(token, secret) as T
    }
}