import { Middleware, MethodNameInflector, HandlerLocator, Command } from '../types';
import { isCallable } from '../utils';

export class CommandHandlerMiddleware implements Middleware {
	private handlerLocator?: HandlerLocator;
	private methodNameInflector?: MethodNameInflector;

	constructor(handlerLocator?: HandlerLocator, methodNameInflector?: MethodNameInflector) {
		this.handlerLocator = handlerLocator;
		this.methodNameInflector = methodNameInflector;
	}

	setHandlerLocator(handlerLocator: HandlerLocator) {
		this.handlerLocator = handlerLocator;
	}

	setMethodNameInflector(methodNameInflector: MethodNameInflector) {
		this.methodNameInflector = methodNameInflector;
	}

	execute(command: Command) {
		if (this.handlerLocator) {
			const handler = this.handlerLocator.getHandlerForCommand(command);

			if (this.methodNameInflector) {
				const methodName = this.methodNameInflector.inflect(command, handler);

				if (isCallable(handler[methodName])) {
					return handler[methodName].call(handler, command);
				}
			}
		}

		return;
	}
}
