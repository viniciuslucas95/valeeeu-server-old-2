import { StatusCode } from "../StatusCode";
import { BaseError } from "./BaseError";

export class InternalServerError extends BaseError {
    constructor(message: string) {
        super(
            'Internal Server Error',
            message,
            StatusCode.internalServerError
        )
    }
}