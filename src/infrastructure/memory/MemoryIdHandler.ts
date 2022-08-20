import { IIdGenerator, IIdValidator } from "../../domain";

export class UuidIdHandler implements IIdGenerator, IIdValidator {
    format = 'string'

    private currentId = 1

    generate() {
        const id = this.currentId

        this.currentId += 1

        return id.toString()
    }

    validate(id: string) {
        return true
    }
}