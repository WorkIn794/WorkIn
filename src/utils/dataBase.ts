import { MONGODB_API_KEY } from "astro:env/server";
import { MongoClient, ServerApiVersion } from "mongodb";

export function createClient(): MongoClient {
    try{
        const client: MongoClient = new MongoClient(MONGODB_API_KEY, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true
            }
        });
        return client;
    }catch(e){
        if(e instanceof Error) console.log(e.message);
        throw e;
    }
}
