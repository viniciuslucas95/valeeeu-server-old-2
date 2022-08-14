import { Id, IIdUniquenessChecker } from "../../domain";
import { IRepositoryReader } from "../configs";

export class IdUniquenessChecker implements IIdUniquenessChecker {
    constructor(private readonly _repository: IRepositoryReader) { }

    async isUnique(id: Id) {
        return !(await this._repository.doesExist(id))
    }
}