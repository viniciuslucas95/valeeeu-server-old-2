import { Email } from "./email";
import { Password } from "./Password";
import { Entity, Id, IHashHandler, Name } from "../shared";
import { WrongCredentialsError } from "./WrongCredentialsError";
import { Token } from "./auth/token";
import { Auth } from "./auth";
import { NoAuthError } from "./NoAuthError";

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

    private _auth?: Auth

    private constructor(
        id: Id,
        private _name: Name,
        private _email: Email,
        private _password: Password,
        createdAt?: Date,
        updatedAt?: Date,
        auth?: Auth
    ) {
        super(id, createdAt, updatedAt)

        this._auth = auth
    }

    static create(id: Id, name: Name, email: Email, password: Password) {
        return new User(id, name, email, password)
    }

    static from(
        id: Id,
        name: Name,
        email: Email,
        password: Password,
        createdAt: Date,
        updatedAt: Date,
        auth?: Auth
    ) {
        return new User(
            id,
            name,
            email,
            password,
            createdAt,
            updatedAt,
            auth
        )
    }

    async verifyPassword(password: string, hashHandler: IHashHandler) {
        const isAuthenticated = await this._password
            .verify(password, hashHandler)

        if (!isAuthenticated) throw new WrongCredentialsError()
    }

    getTokens() {
        if (!this._auth) return undefined

        return {
            accessToken: this._auth.accessToken,
            refreshToken: this._auth.refreshToken
        }
    }

    createAuth(auth: Auth) {
        this._auth = auth

        this.updateModificationDate()
    }

    async verifyAccessToken(accessToken: Token, hashHandler: IHashHandler) {
        if (!this._auth) throw new NoAuthError()

        return await hashHandler.verify(accessToken.value, this._auth.accessToken)
    }

    refreshAccessToken(accessToken: Token) {
        if (!this._auth) throw new NoAuthError()

        this._auth.changeAccessToken(accessToken)

        this.updateModificationDate()
    }
}