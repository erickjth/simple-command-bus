import { isFunction } from 'lodash';
import MethodNameInflector from './MethodNameInflector';

export default class HandleInflector extends MethodNameInflector {
	constructor(methodName) {
		super();
		this.methodName = methodName || 'handle';
	}

	inflect(commandName, handler) {
		if (isFunction(handler[this.methodName]) === false) {
			throw new Error(`Handler does not have "${this.methodName}" method.`);
		}

		return this.methodName;
	}
}
