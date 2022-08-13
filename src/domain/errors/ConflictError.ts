import { BaseError } from "./BaseError";

export class ConflictError extends BaseError {
    constructor(message: string) {
        super('Conflict', message, 409)
    }
}