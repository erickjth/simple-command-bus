import {
  Handler,
  Command,
  CommandBus,
  CommandHandlerMiddleware,
  HandleInflector,
  NamespaceHandlerLocator,
} from '../../src';
import CreateCommandBusProxy from '../../src/CreateCommandBusProxy';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const commandsPath = `${__dirname}/commands`;
const handlersPath = `${__dirname}/handlers`;

export type Account = {
  id: string;
  name: string;
  email: string;
};

export type Container = {
  accountRepository: {
    findById: (id: string) => Promise<Account>;
  };
};

class NamespaceHandlerLocatorWithContainer extends NamespaceHandlerLocator {
  container: Container;

  constructor(container: Container, handlersPath: string) {
    super(handlersPath);
    this.container = container;
  }

  createInstanceForHandler<C extends Command>(Module: any): Handler<C> {
    return new Module(this.container);
  }
}

const container: Container = {
  accountRepository: {
    findById: (id: string) => {
      return Promise.resolve({
        id,
        name: 'John Doe',
        email: 'john@doe.org',
      });
    },
  },
};

const commandHandlerMiddleware = new CommandHandlerMiddleware(
  new NamespaceHandlerLocatorWithContainer(container, handlersPath),
  new HandleInflector(),
);

const simpleCommandBus = new CommandBus([commandHandlerMiddleware]);

const commandBusProxy = CreateCommandBusProxy(simpleCommandBus, commandsPath);

commandBusProxy.getAccount({ id: 'abc123' }).then(console.log);
