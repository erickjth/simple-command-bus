import { Middleware, NextFunction, CommandBus as ICommandBus, Command } from './types';

/**
 * Bus that run and handle commands through middlewares
 */
export class CommandBus implements ICommandBus {
	private stack: Middleware[] = [];

	/**
	 * Class constructor
	 * @param middlewares set of middlewares
	 */
	constructor(middlewares: Middleware[] = []) {
		this.stack = middlewares;
	}

	/**
	 * Returns middleware stack
	 */
	getMiddlewareStack(): Middleware[] {
		return this.stack;
	}

	/**
	 * Handles a command through the middleware stack
	 * @param command
	 */
	handle<C extends Command>(command: C): any {
		const runCommandInMiddlewareStack = this.stack.reduceRight(
			(next: NextFunction<C>, middleware: Middleware) => {
				return middleware.execute.bind(middleware, command, next);
			},
			() => null
		);

		const result = runCommandInMiddlewareStack();

		return result;
	}
}
