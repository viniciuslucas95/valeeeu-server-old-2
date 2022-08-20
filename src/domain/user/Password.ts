import { InvalidLengthError, InvalidTypeError } from "../errors";
import { IHashHandler, ValueObject } from "../shared";

export class Password extends ValueObject {
    private static readonly MIN_LENGTH = 6
    private static readonly MAX_LENGTH = 64

    private constructor(value: string) {
        super(value)
    }

    static async create(password: string, hashHandler: IHashHandler) {
        this.checkPassword(password)

        const hashedPassword = await hashHandler.hash(password)

        return new Password(hashedPassword)
    }

    static from(password: string, validate?: boolean) {
        if (validate)
            this.checkPassword(password)

        return new Password(password)
    }

    async verify(password: string, hashHandler: IHashHandler) {
        Password.checkPassword(password)

        return await hashHandler.verify(password, this.value)
    }

    private static checkPassword(password: string) {
        if (typeof password !== 'string') throw new InvalidTypeError('Password')
        if (password.length < this.MIN_LENGTH)
            throw new InvalidLengthError('Password', this.MIN_LENGTH, this.MAX_LENGTH)
    }
}