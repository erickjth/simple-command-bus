import { isFunction } from 'lodash';
import CommandNameExtractor from './CommandNameExtractor/CommandNameExtractor';
import MethodNameInflector from './MethodNameInflector/MethodNameInflector';
import HandlerLocator from './Locator/HandlerLocator';
import Middleware from '../Middleware';

// Intend to define private property
const _commandNameExtractor = Symbol('commandNameExtractor');
const _handlerLocator = Symbol('handlerLocator');
const _methodNameInflector = Symbol('methodNameInflector');

export default class CommandHandlerMiddleware extends Middleware {
	constructor(commandNameExtractor, handlerLocator, methodNameInflector) {
		super();
		this[_commandNameExtractor] = commandNameExtractor;
		this[_handlerLocator] = handlerLocator;
		this[_methodNameInflector] = methodNameInflector;
	}

	set commandNameExtractor(commandNameExtractor) {
		this[_commandNameExtractor] = commandNameExtractor;
	}

	set handlerLocator(handlerLocator) {
		this[_handlerLocator] = handlerLocator;
	}

	set methodNameInflector(methodNameInflector) {
		this[_methodNameInflector] = methodNameInflector;
	}

	execute(command, next) {
		let commandName = null;
		let handler = null;
		let methodName = null;
		let result = null;

		if (this[_commandNameExtractor] instanceof CommandNameExtractor) {
			commandName = this[_commandNameExtractor].extractName(command);
		}

		if (commandName && this[_handlerLocator] instanceof HandlerLocator) {
			handler = this[_handlerLocator].getHandlerForCommand(commandName);
		}

		if (commandName && handler && this[_methodNameInflector] instanceof MethodNameInflector) {
			methodName = this[_methodNameInflector].inflect(commandName, handler);
		}

		if (handler && isFunction(handler[methodName])) {
			result = handler[methodName].call(null, command);
		}

		return result || null;
	}
}
