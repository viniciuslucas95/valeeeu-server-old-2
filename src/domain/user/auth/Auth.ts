import { Token } from "./token";

export class Auth {
    public get accessToken() {
        return this._accessToken.value
    }

    public get refreshToken() {
        return this._refreshToken.value
    }

    private constructor(
        private _accessToken: Token,
        private readonly _refreshToken: Token
    ) { }

    static create(
        accessToken: Token,
        refreshToken: Token
    ) {
        return new Auth(accessToken, refreshToken)
    }

    static from(
        accessToken: Token,
        refreshToken: Token
    ) {
        return new Auth(accessToken, refreshToken)
    }

    changeAccessToken(accessToken: Token) {
        this._accessToken = accessToken
    }
}