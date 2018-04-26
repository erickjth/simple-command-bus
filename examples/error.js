
const util = require('util');
const CommandBus = require('../lib/commandBus').default;
const Command = require('../lib/Command').default;
const InvalidMiddlewareException = require('../lib/exceptions/InvalidMiddleware').default;

class FooCommand extends Command {
}

class InvalidMiddleware {}

var commandBus = new CommandBus([ new InvalidMiddleware() ]);

////////////////////////////////
const fooCommand = new FooCommand();

try {
	var result = commandBus.handle(fooCommand);
} catch (e) {
	console.log(e.message());
}




