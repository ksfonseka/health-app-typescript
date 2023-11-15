import {Context, Contract, Info, Returns, Transaction} from "fabric-contract-api";
import {User} from "../models/user";
import stringify from "json-stringify-deterministic";
import sortKeysRecursive from "sort-keys-recursive";
import * as bcrypt from 'bcrypt';


@Info({title: 'UserSmartContract', description: 'Smart contracts related to User'})
export class UserSmartContract extends Contract{
    @Transaction(true)
    public async Register(ctx: Context, email: string, password: string, firstName: string, lastName: string): Promise<void> {
        const existUser: User = await this.UserExists(ctx, email)
        if (!existUser) {
            throw new Error(`The user ${email} already registered`);
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user : User = {
            email,
            lastName,
            firstName,
            password: hashedPassword
        }

        await ctx.stub.putState(email, Buffer.from(stringify(sortKeysRecursive(user))))
    }

    @Transaction(false)
    @Returns('User')
    public async UserExists(ctx: Context, email: string): Promise<User> {
        const user = await ctx.stub.getState(email);
        return JSON.parse(user.toString());
    }

    @Transaction(false)
    public async Login(ctx: Context, email: string, password: string): Promise<void> {
        const user: User = await this.UserExists(ctx, email)

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        if(user.password !== hashedPassword){
            throw new Error(`Password is incorrect!`);
        }


    }
}
