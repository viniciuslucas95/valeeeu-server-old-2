import { Id, ITokenGenerator, Token } from "../value-objects";
import { User } from "../user";
import { AccessTokenPayload } from "./AccessTokenPayload";
import { RefreshTokenPayload } from "./RefreshTokenPayload";

export class LoginManager {
    private constructor(
        private readonly _tokenGenerator: ITokenGenerator,
        private readonly _accessTokenSecret: string,
        private readonly _refreshTokenSecret: string
    ) { }

    static create(
        tokenGenerator: ITokenGenerator,
        accessTokenSecret: string,
        refreshTokenSecret: string
    ) {
        return new LoginManager(
            tokenGenerator,
            accessTokenSecret,
            refreshTokenSecret
        )
    }

    async login(user: User) {
        const userId = Id.from(user.id)

        const accessTokenPayload = AccessTokenPayload.create(userId)
        const accessToken = Token.create(
            accessTokenPayload,
            this._tokenGenerator,
            this._accessTokenSecret
        )

        const refreshTokenPayload = RefreshTokenPayload.create(userId, accessToken)
        const refreshToken = Token.create(
            refreshTokenPayload,
            this._tokenGenerator,
            this._refreshTokenSecret
        )

        return {
            accessToken,
            refreshToken
        }
    }
}