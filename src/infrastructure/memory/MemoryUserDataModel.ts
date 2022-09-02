import { Auth, Email, Id, Name, Password, Token, User } from "../../domain";
import { MemoryBaseDataModel } from "./BaseDataModal";

export class MemoryUserDataModel extends MemoryBaseDataModel<User> {
    readonly name: string
    readonly email: string
    readonly password: string
    readonly auth?: {
        accessToken: string,
        refreshToken: string
    }

    constructor(user: User) {
        super(user.id, user.createdAt, user.updatedAt)

        this.name = user.name
        this.email = user.email
        this.password = user.password

        const tokens = user.getTokens()

        if (tokens)
            this.auth = tokens
    }

    toEntity(): User {
        const id = Id.from(this.id)
        const name = Name.from(this.name)
        const email = Email.from(this.email)
        const password = Password.from(this.password)

        let auth: Auth | undefined = undefined

        if (this.auth) {
            const accessToken = Token.from(this.auth?.accessToken)
            const refreshToken = Token.from(this.auth?.refreshToken)
            auth = Auth.from(accessToken, refreshToken)
        }

        return User.from(
            id,
            name,
            email,
            password,
            this.createdAt,
            this.updatedAt,
            auth
        )
    }
}