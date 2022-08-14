import { ITokenPayload } from "./ITokenPayload";

export interface ITokenVerifier {
    verify: <T extends ITokenPayload>(token: string, secret: string) => T
}