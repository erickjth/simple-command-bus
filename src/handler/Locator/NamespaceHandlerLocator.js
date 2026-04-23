import {
	isString, isFunction, isDirectory, walkSync
} from '../../utils';
import HandlerLocator from './HandlerLocator';
import MissingHandlerException from '../../exceptions/MissingHandlerException';
import InvalidCommandException from '../../exceptions/InvalidCommandException';

export default class NamespaceHandlerLocator extends HandlerLocator {
	constructor(handlersPath) {
		super();

		if (!handlersPath || !isDirectory(handlersPath)) throw new Error('Invalid commands path.');

		// O(1) lookup map for instant handler retrieval
		this.handlersMap = new Map();
		const handlerPaths = walkSync(handlersPath);

		// Pre-load handlers into memory once during initialization for maximum scalability
		handlerPaths.forEach((filePath) => {
			// eslint-disable-next-line max-len
			// Targeted disable since dynamic loading is the explicit architectural purpose of this boot sequence
			// eslint-disable-next-line import/no-dynamic-require, global-require
			const HandlerModule = require(filePath);
			const Handler = HandlerModule.default || HandlerModule;

			if (isFunction(Handler)) {
				// Extracts the exact handler class name (e.g. "CreateUserHandler") from the file path
				const match = filePath.match(/([^/]+)\.js$/);
				if (match) this.handlersMap.set(match[1], Handler);
			}
		});
	}

	getHandlerForCommand(commandName) {
		if (!isString(commandName)) throw new InvalidCommandException();

		const handlerName = commandName.replace('Command', 'Handler');
		const Handler = this.handlersMap.get(handlerName);

		// Ensure the exception actually throws to prevent continuing with an undefined Handler
		if (!Handler) throw MissingHandlerException.forCommand(commandName);

		return new Handler();
	}
}
