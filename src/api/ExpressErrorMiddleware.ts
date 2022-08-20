import { NextFunction, Response, Request } from "express";

import { BaseError, ILogger, StatusCode } from "../domain";

export class ExpressErrorMiddleware {
    constructor(private readonly _logger: ILogger) { }

    async handleError(error: Error, _: Request, res: Response, next: NextFunction) {
        if (error instanceof BaseError) {
            this._logger.error(error.message)

            res.status(error.code).send(error)

            return
        }

        if (Array.isArray(error)) {
            const errors = error as BaseError[]

            this._logger.error(
                errors
                    .map(error => error.message)
                    .reduce((prev, current, index) => {
                        if (index === 0) return current

                        return `${prev}; ${current}`
                    }, '')
            )

            res.status(errors[0].code).send(errors)

            return
        }

        this._logger.error('Uncaught error: ' + error.message)

        res.status(StatusCode.internalServerError).send(error)
    }
}