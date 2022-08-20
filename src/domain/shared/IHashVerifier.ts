export interface IHashVerifier {
    verify: (value: string, encryptedValue: string) => Promise<boolean>
}