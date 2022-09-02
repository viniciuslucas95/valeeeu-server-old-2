import { IIdHandler } from "../../../shared";

export interface ITokenHandler {
    generate(
        payload: object,
        secret: string,
        daysToExpire: number,
        idHandler: IIdHandler
    ): string

    verify<T extends object>(
        token: string,
        secret: string
    ): T
}