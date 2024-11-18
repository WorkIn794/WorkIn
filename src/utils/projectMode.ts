// Project mode related utilities

export function getDbCredential(): string {
    return import.meta.env.PROD ?
        import.meta.env.PUBLIC_NTL_FUNCTION :
        import.meta.env.PUBLIC_NTL_LOCAL_FUNCTION;
}