import Middleware from './Middleware';
import Command from './Command';

export default class commandBus {
	constructor(middlewares = []) {
		this.middlewaresStack = middlewares;
	}

	applyMiddleware(command) {
		const run = this.middlewaresStack.reduceRight(
			(next, middleware) => {
				if (middleware instanceof Middleware === false) {
					throw new Error('Invalid middleware', middleware);
				}

				return middleware.execute.bind(middleware, command, next);
			},
			() => {}
		);

		return run();
	}

	handle(command) {
		if (command instanceof Command === false) {
			throw new Error('Invalid command', command);
		}

		const result = this.applyMiddleware(command);

		return result;
	}
}
