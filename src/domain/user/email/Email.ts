import { ConflictError, InvalidTypeError } from "../../errors";
import { ValueObject } from "../../shared";
import { IEmailUniquenessChecker } from "./IEmailUniquenessChecker";

export class Email extends ValueObject {
    private constructor(value: string) {
        super(value)
    }

    static async create(
        email: string,
        emailUniquenessChecker: IEmailUniquenessChecker
    ) {
        this.checkEmail(email)

        const emailValueObject = new Email(email)

        const isUnique = await emailUniquenessChecker
            .isUnique(emailValueObject)

        if (!isUnique) throw new ConflictError('Email')

        return emailValueObject
    }

    static from(email: string) {
        this.checkEmail(email)

        return new Email(email)
    }

    private static checkEmail(email: string) {
        if (typeof email !== 'string') throw new InvalidTypeError('Email')
    }
}