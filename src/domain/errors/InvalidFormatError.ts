import { BadRequestError } from "./BadRequestError";

export class InvalidFormatError extends BadRequestError {
    constructor(name: string, format: string) {
        super(`Invalid ${name.toLowerCase()} format (${format})`)
    }
}