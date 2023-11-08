import { Context, Contract, Info, Returns, Transaction } from "fabric-contract-api";
import stringify from "json-stringify-deterministic";
import sortKeysRecursive from "sort-keys-recursive";
import { HealthRecord } from "./healthRecord";

@Info({title: 'CreateHealthRecord', description: 'Smart contract to Create Health Record'})
export class HealthRecordChaincode extends Contract{
    @Transaction()
    public async CreateHealthRecord(ctx: Context, id: string, title: string): Promise<void> {
        const record : HealthRecord = {
            userId: id,
            title
        }

        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(record))))
    }

    @Transaction(false)
    @Returns('string')
    public async GetUserHealthRecords(ctx: Context, userId: string): Promise<string> {

        const res = await ctx.stub.getState(userId);
        return JSON.stringify(Buffer.from(res.toString()).toString('utf8'));
    }
}