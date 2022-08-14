import { ICreationCommandHandler } from "../../configs";
import { UserCreationCommand } from "./UserCreationCommand";
import { UserCreationDto } from "./UserCreationDto";

export interface IUserCreationCommandHandler
    extends ICreationCommandHandler<UserCreationCommand, UserCreationDto> { }