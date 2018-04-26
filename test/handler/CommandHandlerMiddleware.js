/* global it, beforeEach, describe */
import { expect } from 'chai';
import CommandBus from '../../src/CommandBus';
import Command from '../../src/Command';
import CommandHandlerMiddleware from '../../src/handler/CommandHandlerMiddleware';
import ClassNameExtractor from '../../src/handler/CommandNameExtractor/ClassNameExtractor';
import HandleInflector from '../../src/handler/MethodNameInflector/HandleInflector';
import InMemoryLocator from '../../src/handler/Locator/InMemoryLocator';

const consoleMock = { log: () => null };

const commandHandlerMiddleware = new CommandHandlerMiddleware(
	new ClassNameExtractor(),
	new InMemoryLocator({}),
	new HandleInflector()
);

describe('Testing CommandHandlerMiddleware', function() {
	it('Testing constructor with params', function() {
		const commandHandlerMiddleware = new CommandHandlerMiddleware(
			new ClassNameExtractor(),
			new InMemoryLocator({}),
			new HandleInflector()
		);

		expect(commandHandlerMiddleware instanceof CommandHandlerMiddleware).to.be.true;
	});

	it('Setting params separately', function() {
		const commandHandlerMiddleware = new CommandHandlerMiddleware();
		commandHandlerMiddleware.commandNameExtractor = new ClassNameExtractor();
		commandHandlerMiddleware.handlerLocator = new InMemoryLocator();
		commandHandlerMiddleware.methodNameInflector = new HandleInflector();

		expect(commandHandlerMiddleware instanceof CommandHandlerMiddleware).to.be.true;
	});


	it('Handling a command', function() {
		class SumCommand extends Command { constructor(a, b) { super(); this.a = a; this.b = b; } }
		class SumHandler { handle(command) { return command.a + command.b; } }

		const commandHandlerMiddleware = new CommandHandlerMiddleware(
			new ClassNameExtractor(),
			new InMemoryLocator({ SumHandler: new SumHandler() }),
			new HandleInflector()
		);

		const result = commandHandlerMiddleware.execute(new SumCommand(1, 3));
		expect(result).to.be.equal(4);
	});

	it('Handling a command without handler', function() {
		class SumCommand extends Command { constructor(a, b) { super(); this.a = a; this.b = b; } }

		const commandHandlerMiddleware = new CommandHandlerMiddleware(
			new ClassNameExtractor(),
			new InMemoryLocator({ }),
			new HandleInflector()
		);

		expect(() => commandHandlerMiddleware.execute(new SumCommand(1, 2))).to.throw();
	});

	it('Handling a command without any lib', function() {
		class SumCommand extends Command { constructor(a, b) { super(); this.a = a; this.b = b; } }

		const commandHandlerMiddleware = new CommandHandlerMiddleware();

		const result = commandHandlerMiddleware.execute(new SumCommand(1, 2));

		expect(result).to.be.equal(null);
	});
});
