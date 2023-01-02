/* global it, describe */
import { expect } from 'chai';
import { CommandToHandlerMapLocator } from '../../../src/handler/Locator/CommandToHandlerMapLocator';
import { Command, Handler } from '../../../src/types';
import { isCallable } from '../../../src/utils';

describe('Testing CommandToHandlerMapLocator', () => {
	it('Check handler function for command', () => {
		class FooCommand implements Command {}
		const FooHandler = () => {};

		const locator = new CommandToHandlerMapLocator([[FooCommand, FooHandler]]);
		const handler = locator.getHandlerForCommand(new FooCommand());

		expect(isCallable(handler)).to.be.true;
	});

	it('Check handler function for command with class', () => {
		class FooCommand implements Command {}

		class FooHandler implements Handler<FooCommand> {
			handle(command: FooCommand) {}
		}

		const locator = new CommandToHandlerMapLocator([[FooCommand, new FooHandler()]]);
		const handler = locator.getHandlerForCommand(new FooCommand());

		expect(handler instanceof FooHandler).to.be.true;
	});

	it('Missing locator for command', () => {
		class FooCommand implements Command {}

		const locator = new CommandToHandlerMapLocator();
		expect(() => locator.getHandlerForCommand(new FooCommand())).to.throw();
	});
});
