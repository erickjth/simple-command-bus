/* global it, describe */
import { expect } from 'chai';
import Command from '../../../src/Command';
import HandleInflector from '../../../src/handler/MethodNameInflector/HandleInflector';

describe('Testing HandleInflector', () => {
	it('Testing valid handle method', () => {
		const inflector = new HandleInflector();
		class FooCommand extends Command {}
		class FooHandler { handle(command) {} }
		const handleMethod = inflector.inflect(new FooCommand(), new FooHandler());
		expect(handleMethod).to.be.equal('handle');
	});

	it('Handler without handle method', () => {
		const inflector = new HandleInflector();
		const fakeCommand = null;
		class FooHandler { }
		expect(() => inflector.inflect(null, new FooHandler())).to.throw();
	});
});
