import { MongoClient, ServerApiVersion } from "mongodb";

interface LoginData {
  email: string;
  password: "practitioner" | "enterprise";
  role: string;
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
    const user = await req.json() as LoginData;

    await client.connect();
    const db = client.db("workin");
    const collection = db.collection(user.role === "practitioner" ? "practitioner" : "enterprise");

    try {
        const res = await collection.findOne({email: user.email, password: user.password});
        
        if(!res) throw new Error("Not Found");
        return new Response(JSON.stringify(res));
    }catch(e){
        return new Response("false");
    }finally{
        await client.close();
    }
}