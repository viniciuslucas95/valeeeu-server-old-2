import { InvalidTypeError, InvalidLengthError } from "../../errors"
import { ValueObject } from "../ValueObject"

export class Name extends ValueObject {
    private static readonly MIN_LENGTH = 2
    private static readonly MAX_LENGTH = 96

    private constructor(value: string) {
        super(value)
    }

    static create(name: string) {
        this.checkName(name)

        return new Name(name)
    }

    static from(name: string, validate?: boolean) {
        if (validate)
            this.checkName(name)

        return new Name(name)
    }

    private static checkName(name: string) {
        if (typeof name !== 'string') throw new InvalidTypeError('Name')

        if (name.length < this.MIN_LENGTH ||
            name.length > this.MAX_LENGTH
        )
            throw new InvalidLengthError('Name', this.MIN_LENGTH, this.MAX_LENGTH)
    }
}