import createException from './createException';

const InvalidHandlerMethodException = createException('InvalidHandlerMethodException', {
	message: 'Invalid handler method.'
});

InvalidHandlerMethodException.forMethod = (method) => {
	throw new InvalidHandlerMethodException(`Invalid handler method ${method}.`);
};

export default InvalidHandlerMethodException;
