import { Id } from "../../domain";

export class TokenPayload {
    private constructor(public readonly userId: string) { }

    static create(userId: Id) {
        return new TokenPayload(userId.value)
    }
}