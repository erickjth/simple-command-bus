export declare class InvalidHandlerMethodException extends Error {
    constructor(message?: string);
    static forMethod(method: string): InvalidHandlerMethodException;
}
