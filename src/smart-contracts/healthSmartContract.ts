import { Context, Contract, Info, Returns, Transaction } from "fabric-contract-api";
import stringify from "json-stringify-deterministic";
import sortKeysRecursive from "sort-keys-recursive";
import { Medication } from "../models/medication";

@Info({title: 'HealthSmartContract', description: 'Smart contracts related to Health Records'})
export class HealthSmartContract extends Contract{
    @Transaction()
    public async CreateHealthRecord(ctx: Context, id: string, title: string, date: string, note: string): Promise<void> {
        const record : Medication = {
            userId: id,
            title,
            createdAt: Date.now().toString(),
            date,
            note
        }

        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(record))))
    }

    @Transaction(false)
    @Returns('string')
    public async GetUserHealthRecords(ctx: Context, userId: string, noOfRecords: number): Promise<string> {
        const query = `{"selector": {"userId": "${userId}"}}`;

        const res = await ctx.stub.getQueryResultWithPagination(query, noOfRecords)
        return JSON.stringify(Buffer.from(res.toString()).toString('utf8'));
    }




}