import { Object, Property } from "fabric-contract-api";
import {Attachment} from "./attachment";

@Object()
export class Medication {
    @Property()
    public userId: string

    @Property()
    public title: string

    @Property()
    public file?: Attachment[]

    @Property()
    public note: string

    @Property()
    public date: string

    @Property()
    public createdAt: string
}