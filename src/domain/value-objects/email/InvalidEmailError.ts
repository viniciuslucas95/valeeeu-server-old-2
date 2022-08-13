import { BadRequestError } from "../../errors";

export class InvalidEmailError extends BadRequestError {
    constructor() {
        super('Wrong email format')
    }
}