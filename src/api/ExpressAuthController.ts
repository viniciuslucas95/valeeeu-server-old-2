import { Request, Response } from "express";

import { ILoginCommandHandler, LoginCommand } from "../application";
import { StatusCode } from "../domain";

export class ExpressAuthController {
    constructor(private readonly _loginCommandHandler: ILoginCommandHandler) { }

    async post(req: Request, res: Response) {
        const body = req.body

        const loginCommand = new LoginCommand(
            body.email,
            body.password
        )

        const result = await this._loginCommandHandler.handle(loginCommand)

        res.status(StatusCode.ok).send(result)
    }
}