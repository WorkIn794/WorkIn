import nodemailer from "nodemailer"

interface FormModalData {
    name: string;
    email: string;
    message: string;
};

export default async (req: Request): Promise<Response> => {
    const { name, email, message } = await req.json() as FormModalData;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "workin794@gmail.com",
            pass: import.meta.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: "'WorkIn' <workin794@gmail.com>",
        to: name,
        subject: "Contact Us",
        
    }

    return new Response("true");
}