import { BadRequestError } from "./BadRequestError";

export class InvalidLengthError extends BadRequestError {
    constructor(name: string, minLength: number, maxLength: number) {
        super(`Invalid ${name.toLowerCase()} length (min ${minLength}, max ${maxLength})`)
    }
}