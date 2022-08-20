import { Email } from "./Email";

export interface IEmailUniquenessChecker {
    isUnique: (email: Email) => Promise<boolean>
}