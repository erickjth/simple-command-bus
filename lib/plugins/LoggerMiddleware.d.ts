import { Middleware, NextFunction, Command, LoggerInterface } from '../types';
export declare class LoggerMiddleware implements Middleware {
    private logger;
    constructor(logger: Partial<LoggerInterface>);
    execute<C extends Command>(command: C, next: NextFunction<C>): any;
}
