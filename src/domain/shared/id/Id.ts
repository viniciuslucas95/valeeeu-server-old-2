import { InvalidFormatError } from "../../errors"
import { ValueObject } from "../ValueObject"
import { IIdGenerator } from "./IIdGenerator"
import { IIdUniquenessChecker } from "./IIdUniquenessChecker"
import { IIdValidator } from "./IIdValidator"

export class Id extends ValueObject {
    private constructor(value: string) {
        super(value)
    }

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
        if (idValidator && !idValidator.validate(id))
            throw new InvalidFormatError('Id', idValidator.format)

        return new Id(id)
    }
}