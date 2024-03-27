/* global it, describe */
import { expect } from 'chai';
import { HandleInflector } from '../../../src/handler/MethodNameInflector/HandleInflector';
import { AbstractHandler } from '../../../src/AbstractHandler';
import { AbstractCommand } from '../../../src/AbstractCommand';

describe('Testing HandleInflector', () => {
  it('Testing valid handle method', () => {
    const inflector = new HandleInflector();
    class FooCommand extends AbstractCommand {}
    class FooHandler extends AbstractHandler<FooCommand> {
      handle(_command: FooCommand) {}
    }
    const handleMethod = inflector.inflect(new FooCommand(), new FooHandler());
    expect(handleMethod).to.be.equal('handle');
  });

  it('Testing handle class name', () => {
    const inflector = new HandleInflector('execute');

    class FooCommand extends AbstractCommand<number, number> {}

    class FooHandler extends AbstractHandler<FooCommand> {
      execute(command: FooCommand) {
        return command.payload;
      }
    }

    const handleMethod = inflector.inflect(new FooCommand(5), new FooHandler());

    expect(handleMethod).to.be.equal('execute');
  });
});
