import type { Context } from "@netlify/functions";
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://vicentejvg:3tUFwiOVpHqcIYDl@maincluster.ylign.mongodb.net/?retryWrites=true&w=majority&appName=mainCluster"
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

export default async (req: Request, context: Context) => {
    await client.connect();
    const db = client.db("workin");
    const collection = db.collection("process");

    try{
        const processes = await collection.find({}).toArray();
        if(!processes) throw new Error("No processes found");
        
        return new Response(JSON.stringify(processes));
    }catch(e){
        return new Response("false");
    }finally{
        await client.close();
    }
}