import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

interface User {
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
    const { _id } = await req.json() as User;

    await client.connect();
    const db = client.db("workin");
    let collection = db.collection("enterprise");

    try{
        const data = await collection
            .findOne(
                { _id: new ObjectId(_id) },
                { projection: { _id: 0, processes: 1 } }
            );

        if(data){
            collection = db.collection("process");
            const processesId: ObjectId[] = data.processes
                .map((process: string) => new ObjectId(process));

            const processes = await collection.find({ _id: { $in: processesId } }).toArray();

            const transformProcesses = processes.map(process => {
                return {
                    position: process.jobPosition,
                    status: process.status,
                    description: process.description,
                    applicants: [
                        {
                            firstName: "John",
                            lastName: "Doe",
                            skills: ["HTML", "CSS", "JavaScript"]
                        },
                        {
                            firstName: "El",
                            lastName: "Pepe",
                            skills: ["HTML", "CSS", "JavaScript"]
                        },
                        {
                            firstName: "Eso",
                            lastName: "Tilin",
                            skills: ["HTML", "CSS", "JavaScript"]
                        }
                    ]
                }
            });

            return new Response(JSON.stringify(transformProcesses));
        }
    }catch(e){
        console.log(e);
        return new Response(null);
    }finally{
        await client.close();
    }
}