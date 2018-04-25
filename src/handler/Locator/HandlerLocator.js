export default class HandlerLocator {
	getHandlerForCommand(command) {
		throw new Error('getHandlerForCommand method must be implemented');
	}
}
