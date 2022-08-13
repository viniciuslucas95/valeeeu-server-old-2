import { EmailConflictError } from "./EmailConflictError";
import { IEmailUniquenessChecker } from "./IEmailUniquenessChecker";

export class Email {
    private constructor(readonly value: string) { }

    static async create(
        email: string,
        emailUniquenessChecker: IEmailUniquenessChecker
    ) {
        // Validate email

        const isUnique = await emailUniquenessChecker
            .isUnique(email)

        if (!isUnique) throw new EmailConflictError()

        return new Email(email)
    }

    static from(email: string) {
        // Validate email

        return new Email(email)
    }
}