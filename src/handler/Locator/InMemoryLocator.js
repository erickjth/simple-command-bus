import { reduce, has, isString, isFunction, isObject } from 'lodash';
import HandlerLocator from './HandlerLocator';
import MissingHandlerException from '../../exceptions/MissingHandlerException';
import InvalidCommandException from '../../exceptions/InvalidCommandException';

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
			throw new InvalidCommandException();
		}

		const handlerName = commandName.replace('Command', 'Handler');

		if (has(this.handlers, handlerName) === false) {
			MissingHandlerException.forCommand(commandName);
		}

		return this.handlers[handlerName];
	}
}
