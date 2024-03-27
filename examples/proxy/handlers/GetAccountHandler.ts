import { AbstractHandler } from '../../../src';
import { GetAccountCommand } from '../commands/GetAccountCommand';
import { Container } from '../with-container';

export class GetAccountHandler extends AbstractHandler<GetAccountCommand> {
  constructor(protected container: Container) {
    super();
  }

  handle(command: GetAccountCommand) {
    return this.container.accountRepository.findById(command.payload.id);
  }
}
