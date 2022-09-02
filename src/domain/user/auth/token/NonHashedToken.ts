import { IIdHandler, ValueObject } from "../../../shared";
import { ITokenHandler } from "./ITokenHandler";

export class NonHashedToken extends ValueObject {
    private constructor(value: string) {
        super(value)
    }

    static create(
        payload: object,
        secret: string,
        daysToExpire: number,
        idGenerator: IIdHandler,
        tokenGenerator: ITokenHandler
    ) {
        const token = tokenGenerator.generate(
            payload,
            secret,
            daysToExpire,
            idGenerator)

        return new NonHashedToken(token)
    }
}