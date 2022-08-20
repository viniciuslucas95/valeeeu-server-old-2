import { Entity, Id } from "../../domain";

export interface IRepositoryReader<T extends Entity> {
    doesExist(id: Id): Promise<boolean>
    find(id: Id): Promise<T | undefined>
}