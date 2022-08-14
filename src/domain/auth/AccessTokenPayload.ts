import { ITokenPayload, Id } from "../value-objects";

export class AccessTokenPayload implements ITokenPayload {
    private constructor(public readonly userId: string) { }

    static create(userId: Id) {
        return new AccessTokenPayload(userId.value)
    }
}