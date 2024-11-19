/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
    readonly PUBLIC_NTL_FUNCTION: string;
    readonly PUBLIC_NTL_LOCAL_FUNCTION: string;
    readonly EMAIL_PASSWORD: string;
};

interface ImportMeta {
    readonly env: ImportMetaEnv;
};