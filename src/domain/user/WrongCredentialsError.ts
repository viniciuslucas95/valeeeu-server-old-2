import { UnauthorizedError } from "../errors";

export class WrongCredentialsError extends UnauthorizedError {
    constructor() {
        super('Wrong credentials')
    }
}