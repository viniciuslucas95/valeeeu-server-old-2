import { Entity } from "../Entity";
import { Email, Id, IPasswordVerifier, Name, Password } from "../value-objects";
import { WrongCredentialsError } from "./WrongCredentialsError";

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

    async verifyPassword(password: string, passwordVerifier: IPasswordVerifier) {
        const isAuthenticated = await this._password
            .verify(password, passwordVerifier)

        if (!isAuthenticated) throw new WrongCredentialsError()
    }
}