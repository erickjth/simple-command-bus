import {
	AbstractCommand,
	AbstractHandler,
	CommandBus,
	LoggerMiddleware,
	CommandHandlerMiddleware,
	CommandToHandlerMapLocator,
	HandleInflector,
} from '../src';

class CreateAccountCommand extends AbstractCommand<
	{ name: string; last: string },
	Promise<string>
> {}

class CreateAccountHandler extends AbstractHandler<CreateAccountCommand> {
	handle(command: CreateAccountCommand) {
		return new Promise<string>(resolve =>
			setTimeout(
				() =>
					resolve(`Account created for ${command.payload.name} ${command.payload.last}`),
				300
			)
		);
	}
}

const commandHandlerMiddleware = new CommandHandlerMiddleware(
	new CommandToHandlerMapLocator([[CreateAccountCommand, new CreateAccountHandler()]]),
	new HandleInflector()
);

const commandBus = new CommandBus([new LoggerMiddleware(console), commandHandlerMiddleware]);

(async function () {
	const createAccountCommand = new CreateAccountCommand({ name: 'John', last: 'Doe' });

	try {
		const result = await commandBus.handle(createAccountCommand);
		console.log('Result:', result);
	} catch (e) {
		console.log('Something went wrong', e);
	}
})();
