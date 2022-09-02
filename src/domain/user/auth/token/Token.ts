import { ValueObject } from "../../../shared"
import { HashedToken } from "./HashedToken"

export class Token extends ValueObject {
    private constructor(value: string) {
        super(value)
    }

    static create(hashedToken: HashedToken) {
        return new Token(hashedToken.value)
    }

    static from(token: string) {
        return new Token(token)
    }
}