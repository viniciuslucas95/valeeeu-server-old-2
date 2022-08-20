export interface IHashHandler {
    hash: (value: string) => Promise<string>
    verify: (value: string, encryptedValue: string) => Promise<boolean>
}