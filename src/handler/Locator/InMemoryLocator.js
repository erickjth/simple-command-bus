import { reduce, has, isString, isFunction, isObject } from 'lodash';
import HandlerLocator from './HandlerLocator';

export default class InMemoryLocator extends HandlerLocator {
	constructor(handlers = {}) {
		super();
		this.handlers = {};
		if (isObject(handlers)) {
			this.handlers = reduce(handlers, (carry, Handler, key) => {
				carry[key] = isFunction(Handler) ? new Handler() : Handler; // eslint-disable-line
				return carry;
			}, {});
		}
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
