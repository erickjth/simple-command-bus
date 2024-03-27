import utils from '../../utils';
import { HandlerLocator, Handler, Command } from '../../types';
import { MissingHandlerException } from '../../exceptions';
import { createRequire } from 'module';

export class NamespaceHandlerLocator implements HandlerLocator {
	private handlers: string[];

	constructor(handlersPath: string) {
		if (!handlersPath || !utils.isDirectory(handlersPath)) {
			throw new Error('Invalid commands path.');
		}

		this.handlers = utils.walkSync(handlersPath);
	}

	createInstanceForHandler<C extends Command>(Module: any): Handler<C> {
		return new Module();
	}

	getHandlerForCommand<C extends Command>(command: C): Handler<C> {
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

		const module = createRequire(import.meta.url)(foundHandler);

		const Handler = (module?.[handlerName] ??
			module?.[utils.lowerCamelCase(handlerName)] ??
			module?.[utils.camelCase(handlerName)] ??
			module?.default ??
			undefined) as Handler<C> | undefined;

		if (utils.isFunction(Handler) === false) {
			throw MissingHandlerException.forCommand(commandName);
		}

		return this.createInstanceForHandler(Handler);
	}
}
