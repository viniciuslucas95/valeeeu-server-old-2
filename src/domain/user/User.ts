import { Email } from "./email";
import { Password } from "./Password";
import { Entity, Id, IHashHandler, Name } from "../shared";
import { WrongCredentialsError } from "./WrongCredentialsError";
import { Token } from "./token";

export class User extends Entity {
    public get name() {
        return this._name.value
    }

    public get email() {
        return this._email.value
    }

    public get password() {
        return this._password.value
    }

    public get accessToken() {
        return this._accessToken?.value
    }

    public get refreshToken() {
        return this._refreshToken?.value
    }

    private _accessToken?: Token
    private _refreshToken?: Token

    private constructor(
        id: Id,
        private _name: Name,
        private _email: Email,
        private _password: Password
    ) {
        super(id)
    }

    static create(id: Id, name: Name, email: Email, password: Password) {
        return new User(id, name, email, password)
    }

    async verifyPassword(password: string, hashHandler: IHashHandler) {
        const isAuthenticated = await this._password
            .verify(password, hashHandler)

        if (!isAuthenticated) throw new WrongCredentialsError()
    }

    changeAccessToken(accessToken?: Token) {
        this._accessToken = accessToken

        this.updateModificationDate()
    }

    changeRefreshToken(refreshToken?: Token) {
        this._refreshToken = refreshToken

        this.updateModificationDate()
    }
}