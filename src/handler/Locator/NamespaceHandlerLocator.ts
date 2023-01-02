import { isCallable, isDirectory, walkSync } from '../../utils';
import { HandlerLocator, CallableHandler, Command } from '../../types';
import { MissingHandlerException } from '../../exceptions';

export class NamespaceHandlerLocator implements HandlerLocator {
	private handlers: string[];

	constructor(handlersPath: string) {
		if (!handlersPath || !isDirectory(handlersPath)) {
			throw new Error('Invalid commands path.');
		}

		this.handlers = walkSync(handlersPath);
	}

	getHandlerForCommand<C extends Command>(command: C): CallableHandler<C> {
		const commandName = command.constructor?.name ?? undefined;
		const handlerName = commandName.replace('Command', 'Handler');

		const foundHandler = this.handlers.find(handler => handler.endsWith(handlerName));

		if (foundHandler === undefined) {
			throw MissingHandlerException.forCommand(commandName);
		}

		const Handler = require(foundHandler);

		if (isCallable(Handler) === false) {
			throw MissingHandlerException.forCommand(commandName);
		}

		return new Handler();
	}
}
