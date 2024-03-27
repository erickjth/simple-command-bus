import { Middleware, NextFunction, Command, LoggerInterface } from '../types';

export class LoggerMiddleware implements Middleware {
	private logger: Partial<LoggerInterface>;

	constructor(logger: Partial<LoggerInterface>) {
		this.logger = logger;
	}

	execute<C extends Command>(command: C, next: NextFunction<C>) {
		this.logger?.log?.('Before command: ', command);
		const returnValue = next(command);
		this.logger?.log?.('After command result: ', command, returnValue);
		return returnValue;
	}
}
