
const util = require('util');
const CommandBus = require('../lib/commandBus').default;
const CommandHandlerMiddleware = require('../lib/handler/CommandHandlerMiddleware').default;
const LoggerMiddleware = require('../lib/plugins/LoggerMiddleware').default;
const ClassNameExtractor = require('../lib/handler/CommandNameExtractor/ClassNameExtractor').default;
const HandleInflector = require('../lib/handler/MethodNameInflector/HandleInflector').default;
const InMemoryLocator = require('../lib/handler/Locator/InMemoryLocator').default;
const Command = require('../lib/Command').default;

//////////////////////
class CreateAccountCommand extends Command {
	constructor(name, last) {
		super();
		this.name = name;
		this.last = last;
	}
}

class CreateAccountHandler {
	handle(command) {
		return new Promise(resolve =>
			setTimeout(() => resolve({
				name: command.name,
				last: command.last
			}), 300)
		);
	}
};

/////////////////////////
var commandHandlerMiddleware = new CommandHandlerMiddleware(
	new ClassNameExtractor(),
	new InMemoryLocator({ CreateAccountHandler: new CreateAccountHandler() }),
	new HandleInflector()
);

var commandBus = new CommandBus([
	new LoggerMiddleware(console),
	commandHandlerMiddleware
]);

////////////////////////////////

(async function() {
	const createAccountCommand = new CreateAccountCommand('Erick', 'Torres');

	try {
		var result = await commandBus.handle(createAccountCommand);
		console.log('Result:', result);
	} catch(e) {
		console.log('Something went wrong', e);
	}
})()



