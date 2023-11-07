import { Object, Property } from "fabric-contract-api";

@Object()
export class HealthRecord {
    @Property()
    public title: string

    @Property()
    public desription: string
    
    @Property()
    public fileHash: string

    @Property()
    public createdAt: Date
}