import { Entity } from "../Entity";
import { Id, ITokenPayload, Token } from "../value-objects";
import { ITokenVerifier } from "../value-objects";

export class AuthToken extends Entity {
    public get token() {
        return this._token.value
    }

    private constructor(id: Id, private readonly _token: Token) {
        super(id)
    }

    static create(id: Id, token: Token) {
        return new AuthToken(id, token)
    }

    getPayload<T extends ITokenPayload>(
        tokenVerifier: ITokenVerifier,
        secret: string
    ) {
        return this._token.getPayload<T>(tokenVerifier, secret)
    }
}