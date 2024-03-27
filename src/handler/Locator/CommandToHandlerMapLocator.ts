import { MissingHandlerException } from '../../exceptions';
import { HandlerLocator, Handler, Command } from '../../types';
import { HandlerParams, Handlers, Instantiable } from './types';

export class CommandToHandlerMapLocator implements HandlerLocator {
	private handlers: Handlers = new Map();

	constructor(handlers?: HandlerParams) {
		handlers?.forEach(([command, handler]) => {
			this.setHandlerForCommand(command, handler);
		});
	}

	setHandlerForCommand<C extends Command>(command: Instantiable<C>, handler: Handler<C>) {
		this.handlers.set(command, handler);
	}

	setHandlersForCommands(handlers: HandlerParams): void {
		handlers.forEach(([command, handler]) => {
			this.setHandlerForCommand(command, handler);
		});
	}

	getHandlerForCommand<C extends Command>(command: C): Handler<C> {
		const handler = this.handlers.get(command.constructor as Instantiable<C>) ?? null;

		if (!handler) {
			throw MissingHandlerException.forCommand(command.constructor?.name);
		}

		return handler as Handler<C>;
	}
}
