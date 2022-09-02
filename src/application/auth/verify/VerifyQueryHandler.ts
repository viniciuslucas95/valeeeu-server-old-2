import { ITokenHandler, IHashHandler, Id, Token } from "../../../domain";
import { UserNotFoundError } from "../../errors";
import { IUserRepositoryReader } from "../../user";
import { TokenPayload } from "../TokenPayload";
import { IVerifyQueryHandler } from "./IVerifyQueryHandler";
import { VerifyQuery } from "./VerifyQuery";

export class VerifyQueryHandler implements IVerifyQueryHandler {
    constructor(
        private readonly _userRepository: IUserRepositoryReader,
        private readonly _tokenHandler: ITokenHandler,
        private readonly _hashHandler: IHashHandler,
        private readonly _accessTokenSecret: string,
    ) { }

    async handle(query: VerifyQuery) {
        const { userId: userIdString } = this._tokenHandler.verify<TokenPayload>(
            query.accessToken,
            this._accessTokenSecret
        )

        const userId = Id.from(userIdString)

        const user = await this._userRepository.get(userId)

        if (!user) throw new UserNotFoundError()

        const accessToken = Token.from(query.accessToken)

        return await user.verifyAccessToken(accessToken, this._hashHandler)
    }
}