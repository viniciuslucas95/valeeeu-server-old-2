export class UserCreationCommand {
    constructor(
        readonly name: string,
        readonly email: string,
        readonly password: string
    ) { }
}