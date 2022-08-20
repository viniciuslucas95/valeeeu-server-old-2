import { ICommandHandler } from "../../shared";
import { LoginCommand } from "./LoginCommand";
import { LoginDto } from "./LoginDto";

export interface ILoginCommandHandler
    extends ICommandHandler<LoginCommand, LoginDto> { }