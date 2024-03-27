import { InvalidHandlerMethodException } from '../../exceptions';
import { MethodNameInflector, Command, Handler } from '../../types';
import { isCallable } from '../../utils';

export class HandleInflector implements MethodNameInflector {
	protected methodName: string;

	constructor(methodName: string = 'handle') {
		this.methodName = methodName;
	}

	inflect<C extends Command>(command: C, handler: Handler<C>) {
		if (!isCallable(handler[this.methodName])) {
			throw InvalidHandlerMethodException.forMethod(this.methodName);
		}

		return this.methodName;
	}
}
