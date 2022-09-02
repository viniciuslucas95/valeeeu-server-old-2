export interface IQueryHandler<R, T = undefined> {
    handle: (query: T) => Promise<R>
}