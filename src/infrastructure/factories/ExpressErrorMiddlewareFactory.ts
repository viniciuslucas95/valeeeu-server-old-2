import { ExpressErrorMiddleware } from "../../api";
import { ILogger } from "../../domain";

export class ExpressErrorMiddlewareFactory {
    static create(logger: ILogger) {
        const errorMiddleware = new ExpressErrorMiddleware(logger)

        return errorMiddleware.handleError.bind(errorMiddleware)
    }
}