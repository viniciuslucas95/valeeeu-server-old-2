import { BadRequestError } from "./BadRequestError";

export class InvalidTypeError extends BadRequestError {
    constructor(name: string, type: string = 'string') {
        super(`Invalid ${name.toLowerCase()} type (${type})`)
    }
}