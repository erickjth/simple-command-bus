import { isString, isFunction, isDirectory, walkSync } from '../../utils';
import HandlerLocator from './HandlerLocator';
import MissingHandlerException from '../../exceptions/MissingHandlerException';
import InvalidCommandException from '../../exceptions/InvalidCommandException';

export default class NamespaceHandlerLocator extends HandlerLocator {
	constructor(handlersPath) {
		super();

		if (!handlersPath || !isDirectory(handlersPath)) {
			throw new Error('Invalid commands path.');
		}

		this.handlers = walkSync(handlersPath);
	}

	getHandlerForCommand(commandName) {
		if (isString(commandName) === false) {
			throw new InvalidCommandException();
		}

		const handlerName = `${commandName.replace('Command', 'Handler')}.js`;
		const foundHandler = this.handlers.find(handler => handler.endsWith(handlerName));

		if (!foundHandler) {
			MissingHandlerException.forCommand(commandName);
		}

		const Handler = require(foundHandler);

		if (isFunction(Handler) === false) {
			MissingHandlerException.forCommand(commandName);
		}

		return new Handler();
	}
}
