import { createClient } from "@/utils/dataBase";
import { get } from "svelte/store";

const client = createClient();

export default async (req: Request) => {
    const { method } = req;

    switch(method){
        case "GET": return getInternships();
        case "POST": return getInternships();
        default: return new Response("Method not allowed", { status: 405 });
    }
}

async function getInternships(): Promise<Response>{
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