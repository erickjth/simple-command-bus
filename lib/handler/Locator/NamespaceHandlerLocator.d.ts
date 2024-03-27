import { HandlerLocator, Handler, Command } from '../../types';
export declare class NamespaceHandlerLocator implements HandlerLocator {
    private handlers;
    constructor(handlersPath: string);
    createInstanceForHandler<C extends Command>(Module: any): Handler<C>;
    getHandlerForCommand<C extends Command>(command: C): Handler<C>;
}
