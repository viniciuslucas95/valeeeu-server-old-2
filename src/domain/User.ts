import { Email, Id, Name, Password } from "./value-objects";

export class User {
    private constructor(
        public readonly _id: Id,
        public name: Name,
        public email: Email,
        public password: Password
    ) { }

    static async create(id: Id, name: Name, email: Email, password: Password) {
        return new User(id, name, email, password)
    }
}