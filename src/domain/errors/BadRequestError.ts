import { BaseError } from "./BaseError";

export class BadRequestError extends BaseError {
    constructor(message: string) {
        super('Bad Request', message, 400)
    }
}