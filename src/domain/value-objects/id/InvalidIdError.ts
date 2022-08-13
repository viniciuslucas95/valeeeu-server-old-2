import { BadRequestError } from "../../errors";

export class InvalidIdError extends BadRequestError {
    constructor() {
        super('Wrong id format')
    }
}