export class Name {
    private constructor(readonly value: string) { }

    static create(name: string) {
        // Validate name

        return new Name(name)
    }

    static from(name: string) {
        // Validate name

        return new Name(name)
    }
}