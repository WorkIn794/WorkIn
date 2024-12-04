import { createClient } from "@/utils/dataBase";
import { ObjectId } from "mongodb";
import type { Process, Enterprise } from "@/types/global";

const client = createClient();

export default async (req: Request) => {
    const { method, headers } = req;

    if(!headers.get("role"))
        return new Response("Role not set", { status: 400 });
    const role: Readonly<string> = headers.get("role") as string;

    switch(role){
        case "enterprise":
            switch(method){
                case "GET": return await getEnterpriseProcesses(req);
                case "POST": return await createProcess(req);
                default: return new Response("Method not allowed", { status: 405 });
            }
        case "practitioner":
            switch(method){
                case "GET": return await getPractitionerProcesses();
                default: return new Response("Method not allowed", { status: 405 });
            }
        default: return new Response("Role not allowed", { status: 405 });
    }
}

async function getEnterpriseProcesses(req: Request) {
    const { headers } = req;
    const session = JSON.parse(headers.get("session") as string);

    const processes = await client.db("workin").collection("enterprise").aggregate([
        {
            $match: {
                $expr: { $eq: ["$_id", { $toObjectId: session._id }] }
            }
        },
        {
            $project: {
                _id: 0,
                processes: 1
            }
        },
        {
            $set: {
                processes: {
                    $map: {
                        input: "$processes",
                        as: "process",
                        in: { $toObjectId: "$$process" }
                    }
                }
            }
        },
        {
            $lookup: {
                from: "process",
                localField: "processes",
                foreignField: "_id",
                as: "processes"
            }
        },
        {
            $set: {
                processes: {
                    $map: {
                        input: "$processes",
                        as: "process",
                        in: {
                            position: "$$process.jobPosition",
                            status: "$$process.status",
                            description: "$$process.description",
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
                    }
                }
            }
        }
    ]).toArray();

    return new Response(JSON.stringify(processes[0].processes));
}

async function getPractitionerProcesses(): Promise<Response> {
    await client.connect();

    const processes = await client.db("workin").collection("process").aggregate([
        {
            $set: {
                enterpriseId: { $toObjectId: "$enterpriseId" }
            }
        },
        {
            $lookup: {
                from: "enterprise",
                let: { enterpriseId: "$enterpriseId" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ["$_id", "$$enterpriseId"] }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            enterpriseName: 1
                        }
                    }
                ],
                as: "company"
            }
        },
        {
            $set: {
                company: { $first: "$company.enterpriseName" }
            }
        },
        {
            $addFields: {
                publishedDate: { $toDate: "$_id" },
                startDate: "01/03/2024",
                duration: "6 months",
                location: { $concat: ["$district", ", ", "$department"] }
            }
        },
        {
            $unset: ["_id", "enterpriseId"]
        }
    ]).toArray();

    return new Response(JSON.stringify(processes));
}

async function createProcess(req: Request) {
    const process: Process = await req.json();

    await client.connect();
    const db = client.db("workin");

    try{
        const { insertedId } = await db.collection("process")
            .insertOne(process);

        if(!insertedId) throw new Error("Error inserting process");

        const { acknowledged } = await db.collection<Enterprise>("enterprise")
            .updateOne(
                { _id: new ObjectId(process.enterpriseId) },
                { $push: { processes: insertedId.toString() } }
            );

        if(!acknowledged)
            throw new Error("Could not push process's _id into enterprise");
        return new Response("true", { status: 201, statusText: "Process created" });
    }catch(e){
        if(e instanceof Error){
            console.log(e.message);
            return new Response("false", { status: 500, statusText: e.message });
        }
    }finally{
        await client.close();
    }
}