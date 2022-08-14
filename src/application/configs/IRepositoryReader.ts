import { Id } from "../../domain";

export interface IRepositoryReader {
    doesExist(id: Id): Promise<boolean>
}