import { Id } from "./id";

export abstract class Entity {
    public readonly createdAt: Date

    private _updatedAt: Date

    public get id() {
        return this._id.value
    }

    public get updatedAt() {
        return this._updatedAt
    }

    protected constructor(protected readonly _id: Id) {
        const now = new Date()

        this.createdAt = now
        this._updatedAt = now
    }

    protected updateModificationDate() {
        this._updatedAt = new Date()
    }
}