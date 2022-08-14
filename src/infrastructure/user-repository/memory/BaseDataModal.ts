export abstract class MemoryBaseDataModel {
    constructor(
        readonly id: string,
        readonly createdAt: Date,
        readonly updatedAt: Date
    ) { }
}