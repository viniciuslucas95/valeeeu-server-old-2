import { IIdGenerator } from "./IIdGenerator"
import { IIdUniquenessChecker } from "./IIdUniquenessChecker"
import { IIdValidator } from "./IIdValidator"
import { InvalidIdError } from "./InvalidIdError"

export class Id {
    private constructor(public readonly value: string) { }

    static async create(
        idGenerator: IIdGenerator,
        idUniquenessChecker: IIdUniquenessChecker
    ) {
        let id = idGenerator.generate()
        let idValueObject = new Id(id)
        let isIdUnique = await idUniquenessChecker
            .isUnique(idValueObject)

        while (!isIdUnique) {
            id = idGenerator.generate()
            idValueObject = new Id(id)
            isIdUnique = await idUniquenessChecker
                .isUnique(idValueObject)
        }

        return idValueObject
    }

    static from(id: string, idValidator?: IIdValidator) {
        if (!idValidator?.validate(id))
            throw new InvalidIdError()

        return new Id(id)
    }
}