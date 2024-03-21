import { Command } from './types';

export const commandReturnSymbol = Symbol('command-return');

export abstract class AbstractCommand<T, R = unknown> implements Command<T, R> {
	[commandReturnSymbol]?: R;
	constructor(public payload: T) {}
}

export abstract class AbstractCommandWithoutPayload<R = unknown> implements Command<undefined, R> {
	[commandReturnSymbol]?: R;
	constructor() {}
}
