import { isFunction } from 'lodash';
import CommandNameExtractor from './CommandNameExtractor/CommandNameExtractor';
import MethodNameInflector from './MethodNameInflector/MethodNameInflector';
import HandlerLocator from './Locator/HandlerLocator';
import Middleware from '../Middleware';

export default class CommandHandlerMiddleware extends Middleware {
	constructor(commandNameExtractor, handlerLocator, methodNameInflector) {
		super();
		this.commandNameExtractor = commandNameExtractor;
		this.handlerLocator = handlerLocator;
		this.methodNameInflector = methodNameInflector;
	}

	execute(command, next) {
		let commandName = null;
		let handler = null;
		let methodName = null;

		if (this.commandNameExtractor instanceof CommandNameExtractor) {
			commandName = this.commandNameExtractor.extractName(command);
		}

		if (commandName && this.handlerLocator instanceof HandlerLocator) {
			handler = this.handlerLocator.getHandlerForCommand(commandName);
		}

		if (commandName && handler && this.methodNameInflector instanceof MethodNameInflector) {
			methodName = this.methodNameInflector.inflect(commandName, handler);
		}

		if (isFunction(handler[methodName])) {
			return handler[methodName].call(null, command);
		}

		return null;
	}
}
