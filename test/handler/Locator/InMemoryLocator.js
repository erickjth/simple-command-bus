/* global it, describe */
import { expect } from 'chai';
import { isObject } from 'lodash';
import Command from '../../../src/Command';
import InMemoryLocator from '../../../src/handler/Locator/InMemoryLocator';

describe('Testing InMemoryLocator', () => {
	it('Check handler function for command', () => {
		const locator = new InMemoryLocator({ FooHandler: () => {} });
		const handler = locator.getHandlerForCommand('FooCommand');

		expect(isObject(handler)).to.be.true;
	});

	it('Check handler function for command with class', () => {
		class FooHandler {};
		const locator = new InMemoryLocator({ FooHandler });
		const handler = locator.getHandlerForCommand('FooCommand');

		expect(isObject(handler)).to.be.true;
		expect(handler instanceof FooHandler).to.be.true;
	});

	it('Invalid locator for non-valid command', () => {
		const locator = new InMemoryLocator({});
		expect(() => locator.getHandlerForCommand(null)).to.throw();
	});

	it('Missing locator for command', () => {
		const locator = new InMemoryLocator({});
		expect(() => locator.getHandlerForCommand('BarCommand')).to.throw();
	});
});
