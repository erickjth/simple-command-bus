import { Command, CommandReturn, Handler } from './types';
export declare const commandHandledSymbol: unique symbol;
export declare abstract class AbstractHandler<C extends Command<unknown, unknown>> implements Handler<C> {
    constructor();
    [key: string]: (command: C) => CommandReturn<C>;
}
