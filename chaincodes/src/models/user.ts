import { Object, Property } from "fabric-contract-api";

@Object()
export class User {
    @Property()
    public email: string

    @Property()
    public password: string

    @Property()
    public firstName: string

    @Property()
    public lastName: string

}