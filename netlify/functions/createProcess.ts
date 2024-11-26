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
    const process = await req.json();

    await client.connect();
    const db = client.db("workin");
    
    try{
        let collection = db.collection("process");
        const { insertedId } = await collection.insertOne(process);

        collection = db.collection("enterprise");

        const filter = { _id: new ObjectId(process.enterpriseId as string) };
        const update = { $push: { processes: insertedId.toString() } };
        const { acknowledged } = await collection.updateOne(filter, update);

        if(acknowledged) return new Response("true");
    }catch(e){
        console.log("Error: ", e);
        return new Response("false");
    }finally{
        await client.close();
    }
}