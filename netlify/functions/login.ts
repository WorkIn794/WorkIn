import { MongoClient, ServerApiVersion } from "mongodb";

interface LoginData {
  email: string;
  password: string;
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
    const loginData = await req.json() as LoginData;

    await client.connect();
    const db = client.db("workin");
    const collection = db.collection(loginData.role === "practitioner" ? "practitioner" : "enterprise");

    try {
        const user = await collection
            .findOne(
                { email: loginData.email, password: loginData.password },
                { projection: { email: 1 }}
            );
        
        if(!user) throw new Error("Not Found");
        const session = {
            _id: user._id.toString(),
            email: user.email,
            role: loginData.role
        };

        return new Response(JSON.stringify(session));
    }catch(e){
        console.log(e);
        return new Response("false");
    }finally{
        await client.close();
    }
}