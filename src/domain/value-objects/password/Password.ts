import { IPasswordHasher } from "./IPasswordHasher";
import { IPasswordVerifier } from "./IPasswordVerifier";
import { PasswordTooShortError } from "./PasswordTooShortError";

export class Password {
    private static readonly MIN_PASSWORD_LENGTH = 6

    private constructor(private _value: string) { }

    static async create(password: string, passwordHasher: IPasswordHasher) {
        this.checkPassword(password)

        const hashedPassword = await passwordHasher.hash(password)

        return new Password(hashedPassword)
    }

    async verify(password: string, passwordVerifier: IPasswordVerifier) {
        Password.checkPassword(password)

        return await passwordVerifier.verify(password, this._value)
    }

    private static checkPassword(password: string) {
        if (password.length < this.MIN_PASSWORD_LENGTH)
            throw new PasswordTooShortError(this.MIN_PASSWORD_LENGTH)

        // Validate password
    }
}