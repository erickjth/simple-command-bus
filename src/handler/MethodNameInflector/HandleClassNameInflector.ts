import { HandleInflector } from './HandleInflector';
import { InvalidHandlerMethodException } from '../../exceptions';
import { CallableHandler, Command } from '../../types';
import { isCallable } from '../../utils';

export class HandleClassNameInflector extends HandleInflector {
	inflect<C extends Command>(command: Command, handler: CallableHandler<C>) {
		const commandName = (command?.constructor?.name || '').replace('Command', '');

		const methodName = `${this.methodName}${commandName}`;

		if (!isCallable(handler[methodName])) {
			throw InvalidHandlerMethodException.forMethod(methodName);
		}

		return methodName;
	}
}
