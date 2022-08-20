export class LoginDto {
    constructor(
        readonly accessToken: string,
        readonly refreshToken: string
    ) { }
}