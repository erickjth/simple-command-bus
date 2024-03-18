/* global it, beforeEach, describe */
import { expect } from 'chai';
import { CommandHandlerMiddleware } from '../../src/handler/CommandHandlerMiddleware';
import { HandleInflector } from '../../src/handler/MethodNameInflector/HandleInflector';
import { CommandToHandlerMapLocator } from '../../src/handler/Locator/CommandToHandlerMapLocator';
import { Handler } from '../../src/types';
import { AbstractCommand } from '../../src/AbstractCommand';

class SumCommand extends AbstractCommand<{ a: number; b: number }, number> {}

class SumHandler implements Handler<SumCommand> {
	handle(command: SumCommand) {
		return command.payload.a + command.payload.b;
	}
}

describe('Testing CommandHandlerMiddleware', function () {
	it('Testing constructor with params', function () {
		const commandHandlerMiddleware = new CommandHandlerMiddleware(
			new CommandToHandlerMapLocator(),
			new HandleInflector()
		);

		expect(commandHandlerMiddleware instanceof CommandHandlerMiddleware).to.be.true;
	});

	it('Setting params separately', function () {
		const commandHandlerMiddleware = new CommandHandlerMiddleware();
		commandHandlerMiddleware.setHandlerLocator(new CommandToHandlerMapLocator());
		commandHandlerMiddleware.setMethodNameInflector(new HandleInflector());

		expect(commandHandlerMiddleware instanceof CommandHandlerMiddleware).to.be.true;
	});

	it('Handling a command', function () {
		const commandHandlerMiddleware = new CommandHandlerMiddleware(
			new CommandToHandlerMapLocator([[SumCommand, new SumHandler()]]),
			new HandleInflector()
		);

		const result = commandHandlerMiddleware.execute(new SumCommand({ a: 1, b: 3 }));

		expect(result).to.be.equal(4);
	});

	it('Handling a command without handler', function () {
		const commandHandlerMiddleware = new CommandHandlerMiddleware(
			new CommandToHandlerMapLocator(),
			new HandleInflector()
		);

		expect(() => commandHandlerMiddleware.execute(new SumCommand({ a: 1, b: 3 }))).to.throw();
	});

	it('Handling a command without any lib', function () {
		const commandHandlerMiddleware = new CommandHandlerMiddleware();

		const result = commandHandlerMiddleware.execute(new SumCommand({ a: 1, b: 3 }));

		expect(result).to.be.equal(undefined);
	});
});
