import {
    Email, Id, IEmailUniquenessChecker,
    IHashGenerator,
    IIdGenerator, IIdUniquenessChecker,
    Name, Password, User
} from "../../../domain";
import { IUserRepositoryWriter } from "../IUserRepositoryWriter";
import { IUserCreationCommandHandler } from "./IUserCreationCommandHandler";
import { UserCreationCommand } from "./UserCreationCommand";
import { UserCreationDto } from "./UserCreationDto";

export class UserCreationCommandHandler implements IUserCreationCommandHandler {
    constructor(
        private readonly _idGenerator: IIdGenerator,
        private readonly _idUniquenessChecker: IIdUniquenessChecker,
        private readonly _emailUniquenessChecker: IEmailUniquenessChecker,
        private readonly _passwordHasher: IHashGenerator,
        private readonly _userWriteRepository: IUserRepositoryWriter,
        // private readonly _userCreationNotifier: IUserCreationNotifier
    ) { }

    async create(command: UserCreationCommand) {
        const id = await Id.create(this._idGenerator, this._idUniquenessChecker)
        const name = Name.create(command.name)
        const email = await Email.create(command.email, this._emailUniquenessChecker)
        const password = await Password.create(command.password, this._passwordHasher)

        const user = User.create(id, name, email, password)

        await this._userWriteRepository.createOrUpdate(user)

        // await this._userCreationNotifier.notify(user)

        return new UserCreationDto(id.value)
    }
}