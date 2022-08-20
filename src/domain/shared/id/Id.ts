import { InvalidFormatError } from "../../errors"
import { ValueObject } from "../ValueObject"
import { IIdHandler } from "./IIdHandler"
import { IIdUniquenessChecker } from "./IIdUniquenessChecker"

export class Id extends ValueObject {
    private constructor(value: string) {
        super(value)
    }

    static async create(
        idHandler: IIdHandler,
        idUniquenessChecker: IIdUniquenessChecker
    ) {
        let id = idHandler.generate()
        let idValueObject = new Id(id)
        let isIdUnique = await idUniquenessChecker
            .isUnique(idValueObject)

        while (!isIdUnique) {
            id = idHandler.generate()
            idValueObject = new Id(id)
            isIdUnique = await idUniquenessChecker
                .isUnique(idValueObject)
        }

        return idValueObject
    }

    static from(id: string, idHandler?: IIdHandler) {
        if (idHandler && !idHandler.validate(id))
            throw new InvalidFormatError('Id', idHandler.format)

        return new Id(id)
    }
}