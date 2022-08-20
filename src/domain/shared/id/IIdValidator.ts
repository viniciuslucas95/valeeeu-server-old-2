export interface IIdValidator {
    format: string
    validate: (id: string) => boolean
}