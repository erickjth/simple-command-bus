import { isObject } from 'lodash';
import createException from './createException';

const InvalidMiddlewareException = createException('InvalidMiddlewareException', {
	message: 'Invalid Middleware'
});

InvalidMiddlewareException.forMiddleware = (middleware) => {
	let message = null;

	if (isObject(middleware)) {
		message = `Middleware ${middleware.constructor.name} is invalid. It must extend from Middleware`;
	}

	throw new InvalidMiddlewareException(message);
};

export default InvalidMiddlewareException;
