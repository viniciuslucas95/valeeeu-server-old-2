export class Name {
    private constructor(public readonly value: string) { }

    static create(name: string) {
        this.checkName(name)

        return new Name(name)
    }

    static from(name: string) {
        this.checkName(name)

        return new Name(name)
    }

    private static checkName(name: string) {
        // Validate name
    }
}