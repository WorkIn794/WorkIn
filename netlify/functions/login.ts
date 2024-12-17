import { createClient } from "@/utils/dataBase";

interface LoginData {
    email: string;
    password: string;
    role: string;
    rememberMe: boolean;
};

const client = createClient();

export default async (req: Request) => {
    const { method, headers } = req;
    console.log(headers);
}

// export default async (req: Request) => {
//     const loginData = await req.json() as LoginData;
//     console.log("LOGIN DATA: ", loginData);

//     await client.connect();
//     const db = client.db("workin");
//     const collection = db.collection(loginData.role === "practitioner" ? "practitioner" : "enterprise");

//     try {
//         const user = await collection
//             .findOne(
//                 { email: loginData.email, password: loginData.password },
//                 { projection: { email: 1 }}
//             );

//         if(!user) throw new Error("User not found");
//         const session = {
//             _id: user._id.toString(),
//             email: user.email,
//             role: loginData.role
//         };

//         return new Response(JSON.stringify(session));
//     }catch(e){
//         if(e instanceof Error){
//             console.log(e.message);
//             return new Response("false", { status: 401, statusText: e.message });
//         }
//     }finally{
//         await client.close();
//     }
// }