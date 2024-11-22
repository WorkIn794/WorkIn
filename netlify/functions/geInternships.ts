import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

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
    const collection = db.collection("process");

    const processes = collection.find({}).toArray();
}