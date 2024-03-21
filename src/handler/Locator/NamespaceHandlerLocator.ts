import {
	camelCase,
	isCallable,
	isDirectory,
	isFunction,
	lowerCamelCase,
	walkSync,
} from '../../utils';
import { HandlerLocator, CallableHandler, Command } from '../../types';
import { MissingHandlerException } from '../../exceptions';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

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

		const foundHandler = this.handlers.find(handler => {
			const handlerFileName = handler.split('/').pop();
			const name = handlerFileName?.replace('.ts', '').replace('.js', '');
			return handlerName === name;
		});

		if (foundHandler === undefined) {
			throw MissingHandlerException.forCommand(commandName);
		}

		const module = require(foundHandler);

		console.log({ module });

		const Handler =
			module?.[handlerName] ??
			module?.[lowerCamelCase(handlerName)] ??
			module?.[camelCase(handlerName)] ??
			module?.default ??
			undefined;

		if (isFunction(Handler) === false) {
			throw MissingHandlerException.forCommand(commandName);
		}

		return new Handler();
	}
}
