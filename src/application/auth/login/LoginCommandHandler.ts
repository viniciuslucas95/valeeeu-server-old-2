import {
    Auth,
    Email, HashedToken, Id, IHashHandler, IIdHandler,
    ITokenHandler, NonHashedToken, Token
} from "../../../domain";
import { UserNotFoundError } from "../../errors";
import { IUserRepositoryReader, IUserRepositoryWriter } from "../../user";
import { TokenPayload } from "../TokenPayload";
import { ILoginCommandHandler } from "./ILoginCommandHandler";
import { LoginCommand } from "./LoginCommand";
import { LoginDto } from "./LoginDto";

export class LoginCommandHandler implements ILoginCommandHandler {
    private readonly ACCESS_TOKEN_DAYS_TO_EXPIRE = 1
    private readonly REFRESH_TOKEN_DAYS_TO_EXPIRE = 7

    constructor(
        private readonly _tokenHandler: ITokenHandler,
        private readonly _userRepository:
            IUserRepositoryReader & IUserRepositoryWriter,
        private readonly _hashHandler: IHashHandler,
        private readonly _accessTokenSecret: string,
        private readonly _refreshTokenSecret: string,
        private readonly _idHandler: IIdHandler
    ) { }

    async handle(command: LoginCommand) {
        const { email, password } = command

        const user = await this._userRepository
            .getByEmail(Email.from(email))

        if (!user) throw new UserNotFoundError()

        await user.verifyPassword(password, this._hashHandler)

        const userId = Id.from(user.id)

        const [
            {
                nonHashedToken: nonHashedAccessToken,
                token: accessToken
            },
            {
                nonHashedToken: nonHashedRefreshToken,
                token: refreshToken
            }
        ] = await Promise.all([
            this.createToken(userId,
                this._accessTokenSecret,
                this.ACCESS_TOKEN_DAYS_TO_EXPIRE
            ),
            this.createToken(userId,
                this._refreshTokenSecret,
                this.REFRESH_TOKEN_DAYS_TO_EXPIRE
            )
        ])

        const auth = Auth.create(accessToken, refreshToken)

        user.createAuth(auth)

        await this._userRepository.createOrUpdate(user)

        return new LoginDto(nonHashedAccessToken.value, nonHashedRefreshToken.value)
    }

    private async createToken(
        userId: Id,
        secret: string,
        daysToExpire: number
    ) {
        const tokenPayload: TokenPayload = {
            userId: userId.value
        }
        const nonHashedToken = NonHashedToken.create(
            tokenPayload,
            secret,
            daysToExpire,
            this._idHandler,
            this._tokenHandler
        )
        const hashedToken = await HashedToken.create(
            nonHashedToken,
            this._hashHandler
        )

        return {
            token: Token.create(hashedToken),
            nonHashedToken
        }
    }
}