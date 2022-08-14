import { Email, IEmailUniquenessChecker } from "../../domain";
import { IEmailRepositoryReader } from "./IEmailRepositoryReader";

export class EmailUniquenessChecker implements IEmailUniquenessChecker {
    constructor(private readonly _repository: IEmailRepositoryReader) { }

    async isUnique(email: Email) {
        return !(await this._repository.doesEmailExist(email))
    }
}