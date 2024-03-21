import { Middleware } from '../types';
export declare class InvalidMiddlewareException extends Error {
    constructor(message?: string);
    static forMiddleware(middleware?: Middleware): InvalidMiddlewareException;
}
