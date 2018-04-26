/* global it, describe */
import { expect } from 'chai';
import MethodNameInflector from '../../../src/handler/MethodNameInflector/MethodNameInflector';

describe('Testing Abstract MethodNameInflector', () => {
	it('Abstract instance thrown an error', () => {
		const inflector = new MethodNameInflector();
		expect(() => inflector.inflect(null)).to.throw();
	});
});
