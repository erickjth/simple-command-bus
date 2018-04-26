/* global it, beforeEach, describe */
import { expect } from 'chai';
import Command from '../../src/Command';
import LoggerMiddleware from '../../src/plugins/LoggerMiddleware';


describe('Testing CommandHandlerMiddleware', function() {
	it('Testing constructor', function() {
		const loggerMiddleware = new LoggerMiddleware(console);

		expect(loggerMiddleware instanceof LoggerMiddleware).to.be.true;
	});

	it('Testing execute', function() {
		const logger = { log: () => {} }
		const loggerMiddleware = new LoggerMiddleware(console);
		const command = { command: 'Command' };
		const next = () => 'result';
		const result = loggerMiddleware.execute(command, next);
		expect(result).to.be.equal('result');
	});
});
