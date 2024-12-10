export default async (req: Request) => {
    const user = await fetch("https://workindev.netlify.app/.netlify/identity/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: "vicenteJVG@outlook.com",
            password: "abc",
            app_metadata: {
                roles: ["practitioner"]
            },
            user_metadata: {
                data: "Some data"
            }
        })
    });

    console.log(await user.json());

    return new Response("true");
}