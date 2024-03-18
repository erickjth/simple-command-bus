import { Command } from './types';

export const commandReturnSymbol = Symbol('command-return');

export abstract class AbstractCommand<T = unknown, R = unknown> implements Command<T, R> {
	[commandReturnSymbol]: R;
	constructor(public payload: T) {}
}
