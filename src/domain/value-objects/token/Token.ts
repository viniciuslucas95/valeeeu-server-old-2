import { ITokenGenerator } from "./ITokenGenerator";
import { ITokenPayload } from "./ITokenPayload";
import { ITokenVerifier } from "./ITokenVerifier";

export class Token {
    private constructor(public readonly value: string) { }

    static create(
        payload: ITokenPayload,
        tokenGenerator: ITokenGenerator,
        secret: string
    ) {
        const token = tokenGenerator.generate(payload, secret)

        return new Token(token)
    }

    static from(
        token: string,
        tokenVerifier: ITokenVerifier,
        secret: string
    ) {
        tokenVerifier.verify(token, secret)

        return new Token(token)
    }

    getPayload<T extends ITokenPayload>(tokenVerifier: ITokenVerifier, secret: string) {
        return tokenVerifier.verify<T>(this.value, secret)
    }
}