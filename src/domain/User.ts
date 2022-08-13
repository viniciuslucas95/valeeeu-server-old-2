import { Email, Id, Name } from "./value-objects";

export class User {
    public get id() {
        return this._id.value
    }

    public get name() {
        return this._name.value
    }

    public get email() {
        return this._email.value
    }

    private constructor(
        private readonly _id: Id,
        private _name: Name,
        private _email: Email
    ) { }

    static async create(id: Id, name: Name, email: Email) {
        return new User(id, name, email)
    }
}