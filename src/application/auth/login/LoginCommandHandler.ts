import { ILoginCommandHandler } from "./ILoginCommandHandler";
import { LoginCommand } from "./LoginCommand";
import { LoginDto } from "./LoginDto";

export class LoginCommandHandler implements ILoginCommandHandler {
    constructor(
        private readonly _accessTokenSecret: string,
        private readonly _refreshTokenSecret: string
    ) { }

    async create(command: LoginCommand) {
        const { email, password } = command

        // Get user

        // Generate tokens
        const accessToken = ''
        const refreshToken = ''

        return new LoginDto(accessToken, refreshToken)
    }
}