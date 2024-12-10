import GoTrue from "gotrue-js";

const goTrue = new GoTrue({
    APIUrl: import.meta.env.PUBLIC_NTL_FUNCTION,
    audience: "",
    setCookie: true
});

// const user = await goTrue.signup("","")

export async function signUp(role: "practitioner" | "enterprise"){
    await fetch("https://workindev.netlify.app/.netlify/identity/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: "vicenteJVG@outlook.com",
            password: "abc",
            role: role,
            user_metadata: {
                name: "Vicente Javier Viera Guizar",
            },
            app_metadata: {
                roles: [role]
            }
        })
    }).then(res => res.json())
    .then(res => console.log(res));
    // try{
    //     const user = await goTrue.signup("vicenteJVG@outlook.com", "abc", {
    //         role: role
    //     });

    //     if(!user) throw new Error("Error signing up");
    //     console.log(user.role);
    //     return user;
    // }catch(e){
    //     if(e instanceof Error) throw e.message;
    // }
}