import { Entity } from "../../../domain";

export abstract class MemoryBaseDataModel<T extends Entity> {
    constructor(
        readonly id: string,
        readonly createdAt: Date,
        readonly updatedAt: Date
    ) { }

    abstract toEntity(): T
}