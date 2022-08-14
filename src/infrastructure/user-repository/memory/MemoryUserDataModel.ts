import { User } from "../../../domain";
import { MemoryBaseDataModel } from "./BaseDataModal";

export class MemoryUserDataModel extends MemoryBaseDataModel {
    readonly name: string
    readonly email: string
    readonly password: string

    constructor(user: User) {
        super(user.id, user.createdAt, user.updatedAt)

        this.name = user.name
        this.email = user.email
        this.password = user.password
    }
}