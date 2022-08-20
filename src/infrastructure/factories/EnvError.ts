import { InternalServerError } from "../../domain";

export class EnvError extends InternalServerError {
    constructor(name: string) {
        super(`${name} environment not configurated`)
    }
}