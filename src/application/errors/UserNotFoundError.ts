import { NotFoundError } from "../../domain";

export class UserNotFoundError extends NotFoundError {
    constructor() {
        super('User not found')
    }
}