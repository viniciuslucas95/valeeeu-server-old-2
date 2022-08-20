import {
    Email, Id, IEmailUniquenessChecker, IHashHandler,
    IIdHandler, IIdUniquenessChecker,
    Name, Password, User
} from "../../../domain";
import { IUserRepositoryWriter } from "../IUserRepositoryWriter";
import { IUserCreationCommandHandler } from "./IUserCreationCommandHandler";
import { UserCreationCommand } from "./UserCreationCommand";
import { UserCreationDto } from "./UserCreationDto";

export class UserCreationCommandHandler implements IUserCreationCommandHandler {
    constructor(
        private readonly _idHandler: IIdHandler,
        private readonly _idUniquenessChecker: IIdUniquenessChecker,
        private readonly _emailUniquenessChecker: IEmailUniquenessChecker,
        private readonly _hashHandler: IHashHandler,
        private readonly _userWriteRepository: IUserRepositoryWriter
    ) { }

    async handle(command: UserCreationCommand) {
        const id = await Id.create(this._idHandler, this._idUniquenessChecker)
        const name = Name.create(command.name)
        const email = await Email.create(command.email, this._emailUniquenessChecker)
        const password = await Password.create(command.password, this._hashHandler)

        const user = User.create(id, name, email, password)

        await this._userWriteRepository.createOrUpdate(user)

        return new UserCreationDto(id.value)
    }
}