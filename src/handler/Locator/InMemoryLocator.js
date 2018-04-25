import { has, isString } from 'lodash';
import HandlerLocator from './HandlerLocator';

export default class InMemoryLocator extends HandlerLocator {
	constructor(handlers) {
		super();
		this.handlers = handlers;
	}

	getHandlerForCommand(commandName) {
		if (isString(commandName) === false) {
			throw new Error('Invalid Command Name.');
		}

		const handlerName = commandName.replace('Command', 'Handler');

		if (has(this.handlers, handlerName) === false) {
			throw new Error(`There is no a handler for "${commandName}" Command.`);
		}

		return this.handlers[handlerName];
	}
}
