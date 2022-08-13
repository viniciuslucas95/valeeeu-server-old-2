import { ConflictError } from "../../errors";

export class EmailConflictError extends ConflictError {
    constructor() {
        super('Email already exists')
    }
}