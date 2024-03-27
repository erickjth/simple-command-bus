import { AbstractCommand } from '../../../src';

export class FooCommand extends AbstractCommand<
  {
    bar: string;
    baz: string;
  },
  {
    bar: string;
    baz: string;
  }
> {}
