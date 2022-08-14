import { IEmailRepositoryReader, IRepositoryReader, IUserRepositoryWriter } from "../../../application";
import { Email, Id, User } from "../../../domain";
import { MemoryUserDataModel } from "./MemoryUserDataModel";

export class MemoryUserRepository implements
    IUserRepositoryWriter,
    IRepositoryReader,
    IEmailRepositoryReader {

    private readonly _users: MemoryUserDataModel[] = []

    async create(user: User) {
        this._users.push(user)
    }

    async doesExist(id: Id): Promise<boolean> {
        return this._users
            .find(user => user.id === id.value) ?
            true :
            false
    }

    async doesEmailExist(email: Email): Promise<boolean> {
        return this._users
            .find(user => user.email === email.value) ?
            true :
            false
    }
}