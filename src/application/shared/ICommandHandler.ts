export interface ICommandHandler<T, R = void> {
    create: (command: T) => Promise<R>
}