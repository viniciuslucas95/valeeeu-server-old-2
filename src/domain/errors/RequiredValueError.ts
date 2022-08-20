import { BadRequestError } from "./BadRequestError";

export class RequiredValueError extends BadRequestError {
    constructor(name: string) {
        super(`${name} is required`)
    }
}