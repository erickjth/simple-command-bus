import { InvalidHandlerMethodException } from '../../exceptions';
import { MethodNameInflector, Command, CallableHandler } from '../../types';
import { isCallable } from '../../utils';

export class HandleInflector implements MethodNameInflector {
	private methodName: string;

	constructor(methodName: string = 'handle') {
		this.methodName = methodName;
	}

	inflect<C extends Command>(command: Command, handler: CallableHandler<C>) {
		if (!isCallable(handler[this.methodName])) {
			throw InvalidHandlerMethodException.forMethod(this.methodName);
		}

		return this.methodName;
	}
}
