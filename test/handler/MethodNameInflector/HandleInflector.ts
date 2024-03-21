/* global it, describe */
import { expect } from 'chai';
import { Command, CommandReturn, Handler } from '../../../src/types';
import { HandleInflector } from '../../../src/handler/MethodNameInflector/HandleInflector';
import { AbstractHandler } from '../../../src/AbstractHandler';
import { AbstractCommand } from '../../../src/AbstractCommand';

describe('Testing HandleInflector', () => {
	it('Testing valid handle method', () => {
		const inflector = new HandleInflector();
		class FooCommand implements Command {}
		class FooHandler extends AbstractHandler<FooCommand> {
			handle(command: Command) {}
		}
		const handleMethod = inflector.inflect(new FooCommand(), new FooHandler());
		expect(handleMethod).to.be.equal('handle');
	});

	it('Testing handle class name', () => {
		const inflector = new HandleInflector();
		class FooCommand extends AbstractCommand<number, number> {}

		const foo = new FooCommand(2);

		class FooHandler extends AbstractHandler<FooCommand> {
			handle(command: FooCommand) {
				return command.payload;
			}
		}

		const handler = new FooHandler();

		handler.handle;

		// class FooCommand implements Command {}
		// const handleMethod = MakeHandler(new FooCommand);
		// class FooHandler implements {
		// 	handle(command: Command) {}
		// }
	});
});

class FooCommand implements Command {}

class Testing<T extends Command> {
	handle(command: T) {
		return command;
	}
}

const t = new Testing<FooCommand>();

t.handle;
