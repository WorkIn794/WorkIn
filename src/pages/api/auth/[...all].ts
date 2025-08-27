import auth from "@/utils/auth";
import type { APIRoute } from "astro";

export const ALL: APIRoute = async cxt => {
    return auth.handler(cxt.request);
}