import { Entity, Id } from "../../domain"

export interface IRepositoryWriter<T extends Entity> {
    createOrUpdate(data: T): Promise<void>
    delete(id: Id): Promise<void>
}