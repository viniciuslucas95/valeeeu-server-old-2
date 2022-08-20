import { AggregateRoot, Id } from "../../domain";

export interface IRepositoryReader<T extends AggregateRoot> {
    doesExist(id: Id): Promise<boolean>
    get(id: Id): Promise<T | undefined>
}