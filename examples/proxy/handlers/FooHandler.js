class FooHandler {
	handle(command) {
		return {
			bar: command.bar,
			baz: command.baz,
		}
	}
};

module.exports = FooHandler;
