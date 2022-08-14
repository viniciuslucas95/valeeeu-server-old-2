import { EmailConflictError } from "./EmailConflictError";
import { IEmailUniquenessChecker } from "./IEmailUniquenessChecker";

export class Email {
    private constructor(public readonly value: string) { }

    static async create(
        email: string,
        emailUniquenessChecker: IEmailUniquenessChecker
    ) {
        this.checkEmail(email)

        const isUnique = await emailUniquenessChecker
            .isUnique(email)

        if (!isUnique) throw new EmailConflictError()

        return new Email(email)
    }

    static from(email: string) {
        this.checkEmail(email)

        return new Email(email)
    }

    private static checkEmail(email: string) {
        // Validate email
    }
}