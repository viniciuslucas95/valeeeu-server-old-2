import { Entity, Id, IIdUniquenessChecker } from "../../domain";
import { IRepositoryReader } from "../repositories";

export class IdUniquenessChecker<T extends Entity> implements IIdUniquenessChecker {
    constructor(private readonly _repository: IRepositoryReader<T>) { }

    async isUnique(id: Id) {
        return !(await this._repository.doesExist(id))
    }
}