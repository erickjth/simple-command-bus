import Middleware from '../Middleware';

export default class LoggerMiddleware extends Middleware {
	constructor(logger) {
		super();
		this.logger = logger;
	}

	execute(command, next) {
		this.logger.log('Before command: ', command);
		const returnValue = next(command);
		this.logger.log('After command result: ', command, returnValue);
		return returnValue;
	}
}
