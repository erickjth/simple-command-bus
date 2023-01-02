import { Command } from './types';

export abstract class AbstractCommand<T> implements Command<T> {
	constructor(public payload: T) {}
}
