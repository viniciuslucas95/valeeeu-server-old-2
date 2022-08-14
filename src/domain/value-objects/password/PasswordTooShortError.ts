import { BadRequestError } from "../../errors";

export class PasswordTooShortError extends BadRequestError {
    constructor(minCharacters: string | number) {
        super(`Password too short (at least ${minCharacters} characters`)
    }
}