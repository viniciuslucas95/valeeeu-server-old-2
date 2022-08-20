import { AggregateRoot, Id } from "../../domain"

export interface IRepositoryWriter<T extends AggregateRoot> {
    createOrUpdate(data: T): Promise<void>
    delete(id: Id): Promise<void>
}