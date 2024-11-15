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
    const user = await req.json() as { email: string, password: string, role: string };

    await client.connect();
    const db = client.db("workin");
    const collection = db.collection(user.role === "practitioner" ? "practitioner" : "enterprise");

    try {
      const res = await collection.findOne({ email: user.email });
      if(!res) throw new Error("Not Found");
      return new Response("true");
    }catch(e){
      return new Response("false");
    }finally{
      await client.close();
    }
}