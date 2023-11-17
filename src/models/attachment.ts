import {Object, Property} from "fabric-contract-api";
import {FileType} from "./file-type";

@Object()
export class Attachment {
    @Property()
    public fileHash: string
}