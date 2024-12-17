// Project mode related utilities
import { NTL_FUNCTION, NLT_DEV_FUNCTION } from "astro:env/client";

const { PROD } = import.meta.env;
const ntlApi = (): string => PROD ? NTL_FUNCTION : NLT_DEV_FUNCTION;

export default ntlApi;

export function getDbCredential(): string {
    const { PROD } = import.meta.env;

    if(!NLT_DEV_FUNCTION) return NTL_FUNCTION;
    return PROD ? NTL_FUNCTION : NLT_DEV_FUNCTION;
}