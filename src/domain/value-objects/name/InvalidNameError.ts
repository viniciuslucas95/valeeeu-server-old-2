import { BadRequestError } from "../../errors";

export class InvalidNameError extends BadRequestError {
    constructor() {
        super('Wrong name format')
    }
}