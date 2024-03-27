import { HandlerLocator, Handler, Command } from '../../types';
import { HandlerParams, Instantiable } from './types';
export declare class CommandToHandlerMapLocator implements HandlerLocator {
    private handlers;
    constructor(handlers?: HandlerParams);
    setHandlerForCommand<C extends Command>(command: Instantiable<C>, handler: Handler<C>): void;
    setHandlersForCommands(handlers: HandlerParams): void;
    getHandlerForCommand<C extends Command>(command: C): Handler<C>;
}
