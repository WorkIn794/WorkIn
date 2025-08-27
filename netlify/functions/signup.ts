import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://vicentejvg:3tUFwiOVpHqcIYDl@maincluster.ylign.mongodb.net/?retryWrites=true&w=majority&appName=mainCluster"
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

export default async (req: Request) => {
    await client.connect();
    const db = client.db("workin");
    const collection = db.collection("practitioner");

    await collection.insertOne(await req.json());
    await client.close();
    return new Response("OK");
}