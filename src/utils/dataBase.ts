import { MongoClient, ServerApiVersion } from "mongodb";

export function createClient(): MongoClient {
    try{
        const { MONGODB_API_KEY } = process.env;
        if(!MONGODB_API_KEY) throw new Error("MONGODB_API_KEY is not set");
    
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