import { isFunction } from 'lodash';
import MethodNameInflector from './MethodNameInflector';
import InvalidHandlerMethodException from '../../exceptions/InvalidHandlerMethodException';

export default class HandleInflector extends MethodNameInflector {
	constructor(methodName) {
		super();
		this.methodName = methodName || 'handle';
	}

	inflect(commandName, handler) {
		if (isFunction(handler[this.methodName]) === false) {
			InvalidHandlerMethodException.forMethod(this.methodName);
		}

		return this.methodName;
	}
}
