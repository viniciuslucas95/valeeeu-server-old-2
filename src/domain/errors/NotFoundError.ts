import { StatusCode } from "../StatusCode";
import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
    constructor(name: string) {
        super('Not Found', `${name} not found`, StatusCode.notFound)
    }
}