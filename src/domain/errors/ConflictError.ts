import { StatusCode } from "../StatusCode";
import { BaseError } from "./BaseError";

export class ConflictError extends BaseError {
    constructor(name: string) {
        super('Conflict', `${name} already exists`, StatusCode.conflict)
    }
}