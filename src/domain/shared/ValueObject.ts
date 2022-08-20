export abstract class ValueObject<T = string>{
    constructor(public value: T) { }
}