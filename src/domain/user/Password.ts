import { InvalidLengthError, InvalidTypeError } from "../errors";
import { ValueObject } from "../shared";
import { IHashGenerator, IHashVerifier } from "../shared";

export class Password extends ValueObject {
    private static readonly MIN_LENGTH = 6
    private static readonly MAX_LENGTH = 64

    private constructor(value: string) {
        super(value)
    }

    static async create(password: string, passwordHasher: IHashGenerator) {
        this.checkPassword(password)

        const hashedPassword = await passwordHasher.hash(password)

        return new Password(hashedPassword)
    }

    static from(password: string) {
        return new Password(password)
    }

    async verify(password: string, passwordVerifier: IHashVerifier) {
        Password.checkPassword(password)

        return await passwordVerifier.verify(password, this.value)
    }

    private static checkPassword(password: string) {
        if (typeof password !== 'string') throw new InvalidTypeError('Password')
        if (password.length < this.MIN_LENGTH)
            throw new InvalidLengthError('Password', this.MIN_LENGTH, this.MAX_LENGTH)
    }
}