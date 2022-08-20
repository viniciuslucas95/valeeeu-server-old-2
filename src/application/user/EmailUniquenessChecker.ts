import { Email, IEmailUniquenessChecker } from "../../domain";
import { IUserRepositoryReader } from "./IUserRepositoryReader";

export class EmailUniquenessChecker implements IEmailUniquenessChecker {
    constructor(private readonly _repository: IUserRepositoryReader) { }

    async isUnique(email: Email) {
        return !(await this._repository.doesExistByEmail(email))
    }
}