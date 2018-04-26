import Middleware from './Middleware';
import Command from './Command';
import InvalidMiddlewareException from './exceptions/InvalidMiddlewareException';
import InvalidCommandException from './exceptions/InvalidCommandException';

// Intend to define private property
const stack = Symbol('stack');

/**
 * Bus that run and handle commands through middlewares
 */
export default class commandBus {
	constructor(middlewares = []) {
		this[stack] = middlewares;
	}

	getMiddlewareStack() {
		return this[stack];
	}

	handle(command) {
		if (command instanceof Command === false) {
			InvalidCommandException.forCommand(command);
		}

		const runCommandInMiddlewareStack = this[stack].reduceRight(
			(next, middleware) => {
				if (middleware instanceof Middleware === false) {
					InvalidMiddlewareException.forMiddleware(middleware);
				}

				return middleware.execute.bind(middleware, command, next);
			},
			() => null
		);

		const result = runCommandInMiddlewareStack();

		return result;
	}
}
