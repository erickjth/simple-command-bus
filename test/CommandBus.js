/* global it, beforeEach, describe */
import { expect } from 'chai';
import CommandBus from '../src/CommandBus';
import Command from '../src/Command';
import CommandHandlerMiddleware from '../src/handler/CommandHandlerMiddleware';
import LoggerMiddleware from '../src/plugins/LoggerMiddleware';
import ClassNameExtractor from '../src/handler/CommandNameExtractor/ClassNameExtractor';
import HandleInflector from '../src/handler/MethodNameInflector/HandleInflector';
import HandleClassNameInflector from "../src/handler/MethodNameInflector/HandleClassNameInflector";
import InMemoryLocator from '../src/handler/Locator/InMemoryLocator';

const consoleMock = {
	log: () => null
};

const commandHandlerMiddleware = new CommandHandlerMiddleware(
	new ClassNameExtractor(),
	new InMemoryLocator({}),
	new HandleInflector()
);


const classNameHandlerMiddleware = new CommandHandlerMiddleware(
	new ClassNameExtractor(),
	new InMemoryLocator({}),
	new HandleClassNameInflector()
);

describe('Testing CommandBus', function() {
	it('Testing constructor without middlewares', function() {
		const bus = new CommandBus();
		expect(bus.getMiddlewareStack().length).to.be.equal(0);
	});

	it('Testing constructor with middlewares', function() {
		const bus = new CommandBus([
			new LoggerMiddleware(consoleMock)
		]);

		expect(bus.getMiddlewareStack().length).to.be.equal(1);
	});

	it('Handling a command without handler', function() {
		const bus = new CommandBus([]);
		class FooCommand extends Command {}
		const result = bus.handle(new FooCommand());
		expect(result).to.be.equal(null);
	});

	it('Handling a command with handler', function() {
		class SumCommand extends Command {
			constructor(a, b) {
				super();
				this.a = a;
				this.b = b;
			}
		}

		class SumHandler { handle(command) { return command.a + command.b; } }
		commandHandlerMiddleware.handlerLocator = new InMemoryLocator({ SumHandler });
		const bus = new CommandBus([commandHandlerMiddleware]);
		const sumCommand = new SumCommand(4, 6);
		const result = bus.handle(sumCommand);
		expect(result).to.be.equal(10);
	});


	it('Handling a command with Class name inflector', function() {
		class SumCommand extends Command {
			constructor(a, b) {
				super();
				this.a = a;
				this.b = b;
			}
		}

		class SumHandler { handleSumCommand(command) { return command.a + command.b; } }
		classNameHandlerMiddleware.handlerLocator = new InMemoryLocator({ SumHandler });
		const bus = new CommandBus([classNameHandlerMiddleware]);
		const sumCommand = new SumCommand(4, 6);
		const result = bus.handle(sumCommand);
		expect(result).to.be.equal(10);
	});

	it('Handling an invalid command', function() {
		class InvalidCommand {}
		const bus = new CommandBus();
		expect(bus.handle.bind(null, new InvalidCommand())).to.throw();
	});

	it('Run command over invalid middleware', function() {
		class FooCommand extends Command {}

		class invalidMiddleware {}

		const bus = new CommandBus([
			new invalidMiddleware() // Invalid middleware
		]);

		expect(() => bus.handle(new FooCommand())).to.throw();
	})
});
