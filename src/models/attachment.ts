import {Object, Property} from "fabric-contract-api";
import {FileType} from "./file-type";

@Object()
export class Attachment {
    @Property()
    public title: string

    @Property()
    public note: string

    @Property()
    public fileType: FileType

    @Property()
    public fileHash: string
}