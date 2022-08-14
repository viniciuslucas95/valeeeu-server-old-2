import { v4 } from "uuid";
import { IIdGenerator } from "../../domain";

export class UuidIdHandler implements IIdGenerator {
    generate() {
        return v4()
    }
}