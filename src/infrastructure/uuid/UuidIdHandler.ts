import { v4, validate as uuidValidate } from "uuid";
import { IIdGenerator, IIdValidator } from "../../domain";

export class UuidIdHandler implements IIdGenerator, IIdValidator {
    format = 'string'

    generate() {
        return v4()
    }

    validate(id: string) {
        return uuidValidate(id)
    }
}