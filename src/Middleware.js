
export default class Middleware {
	execute(command, next) {
		throw new Error('execute method must be implemented');
	}
}
