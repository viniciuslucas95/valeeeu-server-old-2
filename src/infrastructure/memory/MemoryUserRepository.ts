import { IUserRepositoryReader, IUserRepositoryWriter } from "../../application";
import { Email, Id, User } from "../../domain";
import { MemoryUserDataModel } from "./MemoryUserDataModel";

export class MemoryUserRepository implements
    IUserRepositoryWriter,
    IUserRepositoryReader {

    private _users: MemoryUserDataModel[] = []

    async createOrUpdate(data: User) {
        this._users.filter(user => user.id !== data.id)

        const user = new MemoryUserDataModel(data)

        this._users.push(user)
    }

    async delete(id: Id) {
        this._users = this._users.filter(user => user.id !== id.value)
    }

    async get(id: Id) {
        const user = this._users.find(user => user.id === id.value)

        return user?.toEntity()
    }

    async getByEmail(email: Email) {
        const user = this._users.find(user => user.email === email.value)

        return user?.toEntity()
    }

    async doesExist(id: Id) {
        return this._users
            .find(user => user.id === id.value) ?
            true :
            false
    }

    async doesExistByEmail(email: Email) {
        return this._users
            .find(user => user.email === email.value) ?
            true :
            false
    }
}