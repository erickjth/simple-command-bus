/* global it, describe */
import { expect } from 'chai';
const sinon = require('sinon');
const mock = require('mock-require');
import * as utils from '../src/utils';
import CreateCommandBusProxy from '../src/CreateCommandBusProxy';
import { CommandToHandlerMapLocator } from '../src/handler/Locator/CommandToHandlerMapLocator';
import { CommandBus } from '../src/CommandBus';
import { HandleInflector } from '../src/handler/MethodNameInflector/HandleInflector';
import { CommandHandlerMiddleware } from '../src/handler/CommandHandlerMiddleware';
import { AbstractHandler } from '../src/AbstractHandler';
import { Command } from '../src/types';

describe('Testing CommandBus with proxy', function () {
	it('Handling a command with handler', function () {
		sinon.stub(utils, 'walkSync').callsFake(function walkSync() {
			return ['FooCommand.js'];
		});

		sinon.stub(utils, 'isDirectory').callsFake(function isDirectory() {
			return true;
		});

		class FooCommand implements Command {}
		class FooHandler extends AbstractHandler<FooCommand> {
			handle() {
				return 1;
			}
		}

		mock('FooCommand.js', FooCommand);

		const bus = new CommandBus([
			new CommandHandlerMiddleware(
				new CommandToHandlerMapLocator([[FooCommand, new FooHandler()]]),
				new HandleInflector()
			),
		]);

		const busProxy = CreateCommandBusProxy(bus, '/path/to/commands');

		const result = busProxy.foo();

		expect(result).to.be.equal(1);
	});
});
