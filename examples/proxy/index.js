const CommandBus = require('../../lib/commandBus').default;
const CreateCommandBusProxy = require('../../lib/CreateCommandBusProxy').default;
const CommandHandlerMiddleware = require('../../lib/handler/CommandHandlerMiddleware').default;
const LoggerMiddleware = require('../../lib/plugins/LoggerMiddleware').default;
const ClassNameExtractor = require('../../lib/handler/CommandNameExtractor/ClassNameExtractor').default;
const HandleInflector = require('../../lib/handler/MethodNameInflector/HandleInflector').default;
const NamespaceHandlerLocator = require('../../lib/handler/Locator/NamespaceHandlerLocator').default;
const MissingHandlerException = require('../../lib/exceptions/MissingHandlerException').default;

const commandsPath = __dirname + '/commands';
const handlersPath = __dirname + '/handlers';

var commandHandlerMiddleware = new CommandHandlerMiddleware(
	new ClassNameExtractor(),
	new NamespaceHandlerLocator(handlersPath),
	new HandleInflector()
);

var simpleCommandBus = new CommandBus([commandHandlerMiddleware]);

const commandBusProxy = CreateCommandBusProxy(simpleCommandBus, commandsPath);

const result = commandBusProxy.foo('John', 'Doe');

console.log(result);
