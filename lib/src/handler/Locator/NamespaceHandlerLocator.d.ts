import { HandlerLocator, CallableHandler, Command } from '../../types';
export declare class NamespaceHandlerLocator implements HandlerLocator {
    private handlers;
    constructor(handlersPath: string);
    getHandlerForCommand<C extends Command>(command: C): CallableHandler<C>;
}
