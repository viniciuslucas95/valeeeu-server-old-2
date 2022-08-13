export abstract class BaseError {
    constructor(
        readonly name: string,
        readonly message: string,
        readonly code: number
    ) { }
}