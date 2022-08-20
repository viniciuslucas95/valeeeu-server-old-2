import { Id } from "./Id";

export interface IIdUniquenessChecker {
    isUnique: (id: Id) => Promise<boolean>
}