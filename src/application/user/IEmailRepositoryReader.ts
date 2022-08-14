import { Email } from "../../domain";

export interface IEmailRepositoryReader {
    doesEmailExist(email: Email): Promise<boolean>
}