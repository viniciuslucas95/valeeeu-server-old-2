import { Email, Id, Name, Password, User } from "../../domain";
import { MemoryBaseDataModel } from "./BaseDataModal";

export class MemoryUserDataModel extends MemoryBaseDataModel<User> {
    readonly name: string
    readonly email: string
    readonly password: string

    constructor(user: User) {
        super(user.id, user.createdAt, user.updatedAt)

        this.name = user.name
        this.email = user.email
        this.password = user.password
    }

    toEntity(): User {
        const id = Id.from(this.id)
        const name = Name.from(this.name)
        const email = Email.from(this.email)
        const password = Password.from(this.password)

        return User.create(id, name, email, password)
    }
}