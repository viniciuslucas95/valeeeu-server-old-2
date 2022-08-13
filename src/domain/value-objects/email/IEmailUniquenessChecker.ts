export interface IEmailUniquenessChecker {
    isUnique: (email: string) => Promise<boolean>
}