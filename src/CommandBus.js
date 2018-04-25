import Middleware from './Middleware';
import Command from './Command';

// Intend to define private property
const stack = Symbol('stack');

export default class commandBus {
	constructor(middlewares = []) {
		this[stack] = middlewares;
	}

	getMiddlewareStack() {
		return this[stack];
	}

	handle(command) {
		if (command instanceof Command === false) {
			throw new Error('Invalid command', command);
		}

		const runCommandInMiddlewareStack = this[stack].reduceRight(
			(next, middleware) => {
				if (middleware instanceof Middleware === false) {
					throw new Error('Invalid middleware');
				}

				return middleware.execute.bind(middleware, command, next);
			},
			() => null
		);

		const result = runCommandInMiddlewareStack();

		return result;
	}
}
