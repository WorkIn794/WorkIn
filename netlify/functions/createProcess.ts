import type { Context } from "@netlify/functions";
import { MongoClient, ServerApiVersion } from "mongodb";


export default async (req: Request, context: Context) => {
    const uri = "mongodb+srv://vicentejvg:3tUFwiOVpHqcIYDl@maincluster.ylign.mongodb.net/?retryWrites=true&w=majority&appName=mainCluster"
    const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
    });
    
    await client.connect();
    const db = client.db("workin");
    const collection = db.collection("process");

    await collection.insertOne(await req.json());
    await client.close();
}