/* global it, describe */
import { expect } from 'chai';
import { CommandBus } from '../src/CommandBus';
import { AbstractCommand } from '../src/AbstractCommand';
import { AbstractHandler } from '../src/AbstractHandler';
import { CommandHandlerMiddleware } from '../src/handler/CommandHandlerMiddleware';
import { LoggerMiddleware } from '../src/plugins/LoggerMiddleware';
import { HandleInflector } from '../src/handler/MethodNameInflector/HandleInflector';
import { CommandToHandlerMapLocator } from '../src/handler/Locator/CommandToHandlerMapLocator';

const consoleMock = {
  log: () => null,
};

describe('Testing CommandBus', function () {
  it('Testing constructor without middlewares', function () {
    const bus = new CommandBus();
    expect(bus.getMiddlewareStack().length).to.be.equal(0);
  });

  it('Testing constructor with middlewares', function () {
    const bus = new CommandBus([new LoggerMiddleware(consoleMock)]);

    expect(bus.getMiddlewareStack().length).to.be.equal(1);
  });

  it('Handling a command without handler', function () {
    const bus = new CommandBus([]);
    class FooCommand extends AbstractCommand<void> {}
    const result = bus.handle(new FooCommand());
    expect(result).to.be.equal(null);
  });

  it('Handling a command with handler', function () {
    class SumCommand extends AbstractCommand<{ a: number; b: number }, number> {}

    class SumHandler extends AbstractHandler<SumCommand> {
      handle(command: SumCommand) {
        return command.payload.a + command.payload.b;
      }
    }

    const commandHandlerMiddleware = new CommandHandlerMiddleware(
      new CommandToHandlerMapLocator([[SumCommand, new SumHandler()]]),
      new HandleInflector()
    );

    const bus = new CommandBus([commandHandlerMiddleware]);
    const sumCommand = new SumCommand({ a: 4, b: 6 });
    const result = bus.handle(sumCommand);
    expect(result).to.be.equal(10);
  });

  it('Handling an invalid command', function () {
    class InvalidCommand {}
    const bus = new CommandBus();
    expect(bus.handle.bind(null, new InvalidCommand())).to.throw();
  });
});
