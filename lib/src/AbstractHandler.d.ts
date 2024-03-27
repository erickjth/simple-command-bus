import { Command, CommandReturn, Handler } from './types';
export declare const commandHandledSymbol: unique symbol;
export declare abstract class AbstractHandler<C extends Command> implements Handler<C> {
    abstract handle(command: C): CommandReturn<C>;
}
