/* global it, describe */
import { expect } from 'chai';
import sinon from 'sinon';
import module from 'module';
import { NamespaceHandlerLocator } from '../../../src/handler/Locator/NamespaceHandlerLocator';
import utils from '../../../src/utils';
import { AbstractCommand } from '../../../src/AbstractCommand';
import { AbstractHandler } from '../../../src/AbstractHandler';

const sandbox = sinon.createSandbox();

describe('Testing NamespaceHandlerLocator', () => {
	it('Check handler class for command', () => {
		class FooCommand extends AbstractCommand {}
		class FooHandler extends AbstractHandler<FooCommand> {
			handle(command: FooCommand) {
				return 1;
			}
		}

		sandbox.stub(utils, 'isDirectory').callsFake(() => true);
		sandbox.stub(utils, 'walkSync').callsFake(() => ['FooHandler.ts']);
		sandbox.stub(module, 'createRequire').callsFake(() => url => ({ FooHandler }));

		const locator = new NamespaceHandlerLocator('/path/to/handlers');
		const handler = locator.getHandlerForCommand(new FooCommand());

		expect(handler instanceof FooHandler).to.be.true;

		sandbox.restore();
	});

	it('Missing locator for command', () => {
		class FooCommand extends AbstractCommand {}

		sandbox.stub(utils, 'isDirectory').callsFake(() => true);
		sandbox.stub(utils, 'walkSync').callsFake(() => []);
		sandbox.stub(module, 'createRequire').callsFake(() => url => ({}));

		const locator = new NamespaceHandlerLocator('/path/to/handlers');

		expect(() => locator.getHandlerForCommand(new FooCommand())).to.throw(
			/Missing handler for command "FooCommand"/
		);

		sandbox.restore();
	});
});
