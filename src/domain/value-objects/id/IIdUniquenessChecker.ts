export interface IIdUniquenessChecker {
    isUnique: (id: string) => Promise<boolean>
}