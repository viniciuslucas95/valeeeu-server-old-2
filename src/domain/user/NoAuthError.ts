import { BadRequestError } from "../errors";

export class NoAuthError extends BadRequestError {
    constructor() {
        super('Authentication tokens were not created for this user')
    }
}