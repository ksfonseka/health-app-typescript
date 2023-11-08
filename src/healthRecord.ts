import { Object, Property } from "fabric-contract-api";

@Object()
export class HealthRecord {
    @Property()
    public userId: string

    @Property()
    public title: string
}