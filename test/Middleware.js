/* global it, describe */
import { expect } from 'chai';
import Middleware from '../src/Middleware';

describe('Testing Abstract Middleware', () => {
	it('Abstract instance thrown an error', () => {
		const middleware = new Middleware();
		expect(middleware.execute).to.throw();
	});
});
