import { hash as BcryptHash, genSaltSync } from 'bcrypt'

import { IPasswordHasher } from "../../domain";

export class BcryptPasswordHandler implements IPasswordHasher {
    private constructor(private readonly _salt: string) { }

    async hash(password: string) {
        return await BcryptHash(password, this._salt)
    }

    static create(salt?: number) {
        const generatedSalt = genSaltSync(salt)

        return new BcryptPasswordHandler(generatedSalt)
    }
}