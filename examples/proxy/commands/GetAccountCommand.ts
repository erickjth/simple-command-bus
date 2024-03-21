import { AbstractCommand } from '../../../src';
import { Account } from '../with-container';

export class GetAccountCommand extends AbstractCommand<{ id: string }, Promise<Account>> {}
