import { Command, CommandReturn, Handler } from './types';

export const commandHandledSymbol = Symbol('command-handled');

export abstract class AbstractHandler<C extends Command> implements Handler<C> {
	abstract handle(command: C): CommandReturn<C>;
}
