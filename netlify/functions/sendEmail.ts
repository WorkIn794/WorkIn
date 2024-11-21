import { Resend } from "resend";

interface Message {
    fullName: string;
    email: string;
    message: string;
};

export default async (req: Request) => {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const data = await req.json() as Message;

    const template: Readonly<string> = `
        <h1>Contact Message</h1>
        <h2>Message from <strong>${data.fullName}</strong></h2>
        <h3>With email ${data.email}</h3>
        <p>${data.message}</p>
    `;

    try {
        resend.emails.send({
            from: "onboarding@resend.dev",
            to: "workin794@gmail.com",
            subject: "Hello World",
            html: template
        });

        return new Response("true");
    }catch(e){
        console.log(e);
        return new Response("false");
    }
}