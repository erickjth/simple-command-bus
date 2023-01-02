/* global it, describe */
import { expect } from 'chai';
import { Command, Handler } from '../../../src/types';
import { HandleInflector } from '../../../src/handler/MethodNameInflector/HandleInflector';

describe('Testing HandleInflector', () => {
	it('Testing valid handle method', () => {
		const inflector = new HandleInflector();
		class FooCommand implements Command {}
		class FooHandler implements Handler<FooCommand> {
			handle(command: Command) {}
		}
		const handleMethod = inflector.inflect(new FooCommand(), new FooHandler());
		expect(handleMethod).to.be.equal('handle');
	});
});
