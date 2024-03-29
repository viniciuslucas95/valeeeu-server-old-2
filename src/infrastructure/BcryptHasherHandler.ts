import { hash as bcryptHash, genSaltSync, compare } from 'bcrypt'

import { IHashHandler } from '../domain'

export class BcryptHasherHandler implements IHashHandler {
    private constructor(private readonly _salt: string) { }

    async hash(password: string) {
        return await bcryptHash(password, this._salt)
    }

    async verify(value: string, encryptedValue: string) {
        return await compare(value, encryptedValue)
    }

    static create(salt?: number) {
        const generatedSalt = genSaltSync(salt)

        return new BcryptHasherHandler(generatedSalt)
    }
}