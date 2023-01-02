/* global it, beforeEach, describe */
import { expect } from 'chai';
import { LoggerMiddleware } from '../../src/plugins/LoggerMiddleware';
import { Command } from '../../src/types';

describe('Testing CommandHandlerMiddleware', function () {
	it('Testing constructor', function () {
		const loggerMiddleware = new LoggerMiddleware(console);
		expect(loggerMiddleware instanceof LoggerMiddleware).to.be.true;
	});

	it('Testing execute', function () {
		class FooCommand implements Command {}
		const logger = { log: () => {} };
		const loggerMiddleware = new LoggerMiddleware(logger);
		const next = () => 'result';
		const result = loggerMiddleware.execute(new FooCommand(), next);
		expect(result).to.be.equal('result');
	});
});
