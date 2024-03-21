import {
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

var commandHandlerMiddleware = new CommandHandlerMiddleware(
	new NamespaceHandlerLocator(handlersPath),
	new HandleInflector()
);

var simpleCommandBus = new CommandBus([commandHandlerMiddleware]);

const commandBusProxy = CreateCommandBusProxy(simpleCommandBus, commandsPath);

const result = commandBusProxy.foo('John', 'Doe');

console.log(result);
