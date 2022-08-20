import { Email, User } from "../../domain";
import { IRepositoryReader } from "../repositories";

export interface IUserRepositoryReader extends IRepositoryReader<User> {
    doesExistByEmail(email: Email): Promise<boolean>
}