import { AbstractHandler } from '../../../src';
import { FooCommand } from '../commands/FooCommand';

export class FooHandler extends AbstractHandler<FooCommand> {
	handle(command: FooCommand) {
		return {
			bar: command.payload.bar,
			baz: command.payload.baz,
		};
	}
}
