import { IIdGenerator } from "./IIdGenerator"
import { IIdUniquenessChecker } from "./IIdUniquenessChecker"
import { IIdValidator } from "./IIdValidator"
import { InvalidIdError } from "./InvalidIdError"

export class Id {
    private constructor(readonly value: string) { }

    static async create(
        idGenerator: IIdGenerator,
        idUniquenessChecker: IIdUniquenessChecker
    ) {
        let id = idGenerator.generate()
        let isIdUnique = await idUniquenessChecker
            .isUnique(id)

        while (!isIdUnique) {
            id = idGenerator.generate()
            isIdUnique = await idUniquenessChecker
                .isUnique(id)
        }

        return new Id(id)
    }

    static from(id: string, idValidator: IIdValidator) {
        if (!idValidator.validate(id))
            throw new InvalidIdError()

        return new Id(id)
    }
}