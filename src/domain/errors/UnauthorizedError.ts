import { StatusCode } from "../StatusCode";
import { BaseError } from "./BaseError";

export class UnauthorizedError extends BaseError {
    constructor(message: string) {
        super('Unauthorized', message, StatusCode.unauthorized)
    }
}