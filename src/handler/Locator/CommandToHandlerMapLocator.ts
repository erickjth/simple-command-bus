import { MissingHandlerException } from '../../exceptions';
import { HandlerLocator, CallableHandler, Command } from '../../types';
import { HandlerParams, Handlers, Instantiable } from './types';

export class CommandToHandlerMapLocator implements HandlerLocator {
	private handlers: Handlers = new Map();

	constructor(handlers?: HandlerParams) {
		handlers?.forEach(([command, handler]) => {
			this.setHandlerForCommand(command, handler);
		});
	}

	setHandlerForCommand<C extends Command>(command: Instantiable<C>, handler: CallableHandler<C>) {
		this.handlers.set(command, handler);
	}

	setHandlersForCommands(handlers: HandlerParams): void {
		handlers.forEach(([command, handler]) => {
			this.setHandlerForCommand(command, handler);
		});
	}

	getHandlerForCommand<C extends Command>(command: C): CallableHandler<C> {
		const handler = this.handlers.get(command.constructor as Instantiable<C>) ?? null;

		if (!handler) {
			throw MissingHandlerException.forCommand(command.constructor?.name);
		}

		return handler as CallableHandler<C>;
	}
}
