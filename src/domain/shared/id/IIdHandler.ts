export interface IIdHandler {
    format: string

    validate: (id: string) => boolean
    generate: () => string
}