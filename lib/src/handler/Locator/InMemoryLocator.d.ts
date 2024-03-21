import { Handler, HandlerLocator } from '@/types';
type HandlerMaps = Record<string, <C>() => Handler<C>>;
export declare class InMemoryLocator implements HandlerLocator {
    private handlers;
    constructor(handlers?: HandlerMaps);
    getHandlerForCommand(commandName: any): <C>() => Handler<C>;
}
export {};
