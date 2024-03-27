/* global it, describe */
import { expect } from 'chai';
import sinon from 'sinon';
import module from 'module';
import utils from '../src/utils';
import { CommandToHandlerMapLocator } from '../src/handler/Locator/CommandToHandlerMapLocator';
import { CommandBus } from '../src/CommandBus';
import CreateCommandBusProxy from '../src/CreateCommandBusProxy';
import { HandleInflector } from '../src/handler/MethodNameInflector/HandleInflector';
import { CommandHandlerMiddleware } from '../src/handler/CommandHandlerMiddleware';
import { AbstractHandler } from '../src/AbstractHandler';
import { AbstractCommand } from '../src/AbstractCommand';

describe('Testing CommandBus with proxy', function () {
	it('Handling a command with handler', function () {
		class FooCommand extends AbstractCommand {}

		class FooHandler extends AbstractHandler<FooCommand> {
			handle() {
				return 1;
			}
		}

		const sandbox = sinon.createSandbox();

		sandbox.stub(utils, 'walkSync').callsFake(() => ['FooCommand.ts']);
		sandbox.stub(utils, 'isDirectory').callsFake(() => true);
		sandbox.stub(module, 'createRequire').callsFake(() => url => ({ FooCommand }));

		const bus = new CommandBus([
			new CommandHandlerMiddleware(
				new CommandToHandlerMapLocator([[FooCommand, new FooHandler()]]),
				new HandleInflector()
			),
		]);

		const busProxy = CreateCommandBusProxy(bus, '/path/to/commands');

		const result = busProxy.foo();

		expect(result).to.be.equal(1);

		sandbox.restore();
	});
});
