import { MongoClient, ServerApiVersion } from "mongodb";

interface Session {
    _id: string;
    email: string;
    password: string;
};

const uri = "mongodb+srv://vicentejvg:3tUFwiOVpHqcIYDl@maincluster.ylign.mongodb.net/?retryWrites=true&w=majority&appName=mainCluster"
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

export default async (req: Request) => {
    const user = await req.json() as Session;

    await client.connect();
    const db = client.db("workin");
    const collection = db.collection("enterprise");

    try {
        const profile = await collection.findOne({email: user.email});
        if(!profile) throw new Error("Not Found");

        return new Response(JSON.stringify(profile));
    }catch(e){
        console.log(e);
        return new Response("false");
    }finally{
        await client.close();
    }
}