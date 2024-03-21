import { Middleware, CommandBus as ICommandBus, Command, CommandReturn } from './types';
/**
 * Bus that run and handle commands through middlewares
 */
export declare class CommandBus implements ICommandBus {
    private stack;
    /**
     * Class constructor
     * @param middlewares set of middlewares
     */
    constructor(middlewares?: Middleware[]);
    /**
     * Returns middleware stack
     */
    getMiddlewareStack(): Middleware[];
    /**
     * Handles a command through the middleware stack
     * @param command
     */
    handle<C extends Command>(command: C): CommandReturn<C>;
}
