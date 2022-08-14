import { Id, ITokenPayload, Token } from "../value-objects";

export class RefreshTokenPayload implements ITokenPayload {
    private constructor(
        public readonly userId: string,
        public readonly accessToken: string
    ) { }

    static create(userId: Id, accessToken: Token) {
        return new RefreshTokenPayload(userId.value, accessToken.value)
    }
}