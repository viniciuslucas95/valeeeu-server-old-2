import { ICommandHandler } from "../../shared";
import { UserCreationCommand } from "./UserCreationCommand";
import { UserCreationDto } from "./UserCreationDto";

export interface IUserCreationCommandHandler
    extends ICommandHandler<UserCreationCommand, UserCreationDto> { }