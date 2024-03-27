import { Middleware } from '../types';

export class InvalidMiddlewareException extends Error {
	constructor(message: string = 'Invalid Middleware') {
		super(message);
	}

	static forMiddleware(middleware?: Middleware) {
		let message = 'Invalid middleware';

		if (middleware) {
			message += ` "${middleware.constructor.name}"`;
		}

		return new InvalidMiddlewareException(message);
	}
}
