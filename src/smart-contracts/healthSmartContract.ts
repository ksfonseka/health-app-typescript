import { Context, Contract, Info, Returns, Transaction } from "fabric-contract-api";
import stringify from "json-stringify-deterministic";
import sortKeysRecursive from "sort-keys-recursive";
import { Medication } from "../models/medication";
import {Attachment} from "../models/attachment";

@Info({title: 'HealthSmartContract', description: 'Smart contracts related to Health Records'})
export class HealthSmartContract extends Contract{
    @Transaction()
    public async CreateHealthRecord(ctx: Context, id: string, title: string, date: string, files: string[], note: string, createdAt: string): Promise<void> {
        const record : Medication = {
            userId: id,
            title,
            note,
            files,
            date,
            createdAt
        }

        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(record))))
    }

    @Transaction(false)
    @Returns('string')
    public async GetUserHealthRecords(ctx: Context, userId: string, noOfRecords: number): Promise<Medication[]> {
        const query = `{"selector": {"userId": "${userId}"}}`;

        const res = await ctx.stub.getQueryResultWithPagination(query, noOfRecords)
        const allResults:Medication[] = []
        while (true){
            const next = await res.iterator.next()

            if(next.value){
                const jsonStr = next.value.value.toString()
                allResults.push(JSON.parse(jsonStr))
            }

            if(next.done){

                await res.iterator.close();
                return allResults;
            }
        }

    }




}