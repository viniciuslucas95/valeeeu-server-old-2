import { IHashHandler, ValueObject } from "../../../shared";
import { NonHashedToken } from "./NonHashedToken";

export class HashedToken extends ValueObject {
    constructor(value: string) {
        super(value)
    }

    static async create(
        nonHashedToken: NonHashedToken,
        hashHandler: IHashHandler
    ) {
        const hashedToken = await hashHandler.hash(nonHashedToken.value)

        return new HashedToken(hashedToken)
    }
}