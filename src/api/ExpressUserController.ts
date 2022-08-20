import { Request, Response } from "express";

import { IUserCreationCommandHandler, UserCreationCommand } from "../application";
import { StatusCode } from "../domain";

export class ExpressUserController {
    constructor(private readonly _userCreationCommandHandler: IUserCreationCommandHandler) { }

    async post(req: Request, res: Response) {
        const body = req.body

        const userCreationCommand = new UserCreationCommand(
            body.name,
            body.email,
            body.password
        )

        const result = await this._userCreationCommandHandler.create(userCreationCommand)

        res.status(StatusCode.created).send(result)
    }
}