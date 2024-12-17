import ntlApi from "./projectMode";

type Method = "GET" | "POST" | "PUT" | "DELETE";
type Role = "practitioner" | "enterprise";
interface FetchParams {
    method: Method;
    headers: Headers;
    body?: BodyInit;
};

/**
 * 
 * @param func Netlify Function name
 * @param role Enterprise or Practitioner
 * @param method Any of the HTTP methods
 * @param body Request body
 * @returns A Response object from the Netlify Function
 * @throws Error if the request fails
 * @example ntlFunction("login", "practitioner", "POST", bodyData);
 */
export default async function ntlFunction(
    func: string,
    role: Role,
    method: Method,
    body?: BodyInit | undefined | null
): Promise<Response> {
    const headers = new Headers();
    headers.append("role", role);

    const params: FetchParams = {
        method,
        headers,
        body: body ? body : undefined
    };

    try{
        return await fetch(`${ntlApi()}/${func}`, params);
    }catch(e){
        const { message, cause } = e as Error;

        console.error(
            `Error fetching:
            Netlify Function: ${func}.
            Error Message: ${message}
            Error Cause: ${cause}`
        );
        return new Response(message, { status: 500 });
    }
}