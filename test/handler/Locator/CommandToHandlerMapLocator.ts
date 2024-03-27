/* global it, describe */
import { expect } from 'chai';
import { CommandToHandlerMapLocator } from '../../../src/handler/Locator/CommandToHandlerMapLocator';
import { AbstractCommand } from '../../../src/AbstractCommand';
import { AbstractHandler } from '../../../src/AbstractHandler';

describe('Testing CommandToHandlerMapLocator', () => {
	it('Check handler class for command with class', () => {
		class FooCommand extends AbstractCommand {}

		class FooHandler extends AbstractHandler<FooCommand> {
			handle(command: FooCommand) {}
		}

		const locator = new CommandToHandlerMapLocator([[FooCommand, new FooHandler()]]);
		const handler = locator.getHandlerForCommand(new FooCommand());

		expect(handler instanceof FooHandler).to.be.true;
	});

	it('Missing locator for command', () => {
		class FooCommand extends AbstractCommand {}

		const locator = new CommandToHandlerMapLocator();
		expect(() => locator.getHandlerForCommand(new FooCommand())).to.throw();
	});
});
