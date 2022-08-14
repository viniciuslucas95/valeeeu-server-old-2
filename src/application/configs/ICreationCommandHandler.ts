import { ICreationCommand } from "./ICreationCommand";

export interface ICreationCommandHandler<T extends ICreationCommand, R = void> {
    create: (command: T) => Promise<R>
}