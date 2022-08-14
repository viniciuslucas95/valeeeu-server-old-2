export interface IPasswordVerifier {
    verify: (password: string, encryptedPassword: string) => Promise<boolean>
}