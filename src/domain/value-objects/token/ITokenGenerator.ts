import { ITokenPayload } from "./ITokenPayload";

export interface ITokenGenerator {
    generate: (payload: ITokenPayload, secret: string) => string
}