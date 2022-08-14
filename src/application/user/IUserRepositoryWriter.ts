import { User } from "../../domain";

export interface IUserRepositoryWriter {
    create: (user: User) => Promise<void>
}