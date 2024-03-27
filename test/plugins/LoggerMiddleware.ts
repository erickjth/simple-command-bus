/* global it, describe */
import { expect } from 'chai';
import { LoggerMiddleware } from '../../src/plugins/LoggerMiddleware';
import { AbstractCommand } from '../../src/AbstractCommand';

describe('Testing CommandHandlerMiddleware', function () {
  it('Testing constructor', function () {
    const loggerMiddleware = new LoggerMiddleware(console);
    expect(loggerMiddleware instanceof LoggerMiddleware).to.be.true;
  });

  it('Testing execute', function () {
    class FooCommand extends AbstractCommand {}
    const logger = { log: () => {} };
    const loggerMiddleware = new LoggerMiddleware(logger);
    const next = () => 'result';
    const result = loggerMiddleware.execute(new FooCommand(), next);
    expect(result).to.be.equal('result');
  });
});
