
const util = require('util');
const CommandBus = require('../lib/commandBus').default;
const Command = require('../lib/Command').default;

class FooCommand extends Command {
}

class InvalidMiddleware {}

var commandBus = new CommandBus([ new InvalidMiddleware() ]);

////////////////////////////////
const fooCommand = new FooCommand();

var result = commandBus.handle(fooCommand);



