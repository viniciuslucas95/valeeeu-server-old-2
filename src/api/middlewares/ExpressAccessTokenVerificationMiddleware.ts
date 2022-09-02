import { NextFunction, Request, Response } from "express";

import { IVerifyQueryHandler, VerifyQuery } from "../../application";
import { UnauthorizedError } from "../../domain";

export class ExpressAccessTokenVerificationMiddleware {
    constructor(private readonly _verifyQueryHandler: IVerifyQueryHandler) { }

    async handle(req: Request, res: Response, next: NextFunction) {
        const authorization = req.headers['authorization'] as string | undefined

        if (!authorization) throw new UnauthorizedError('No access token')

        const accessToken = authorization.split(' ')[1] as string | undefined

        if (!accessToken) throw new UnauthorizedError('No access token')

        const verifyQuery = new VerifyQuery(accessToken)

        if (!await this._verifyQueryHandler.handle(verifyQuery))
            throw new UnauthorizedError('Invalid access token')

        next()
    }
}