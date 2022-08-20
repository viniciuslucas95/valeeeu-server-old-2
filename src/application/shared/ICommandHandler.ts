export interface ICommandHandler<T, R = void> {
    handle: (command: T) => Promise<R>
}