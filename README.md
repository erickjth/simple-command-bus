# Simple Command Bus
[![Build Status](https://travis-ci.org/erickjth/simple-command-bus.png?branch=master)](https://travis-ci.org/erickjth/simple-command-bus)
[![codecov](https://codecov.io/gh/erickjth/simple-command-bus/branch/master/graph/badge.svg)](https://codecov.io/gh/erickjth/simple-command-bus)


Simple Command Bus Implementation for NodeJS.
It is majorly inspired by Tactician Command Bus for PHP https://tactician.thephpleague.com/

## Requirements
This project requires nodejs 8 or higher.

## Install
### NPM
`npm install simple-command-bus`
### Yarn
`yarn add simple-command-bus`

## Run test
`yarn run test`
`yarn run test:coverage`

## Basic Usage
```
const {
	CommandBus,
	CommandHandlerMiddleware,
	ClassNameExtractor,
	InMemoryLocator,
	HandleInflector,
	LoggerMiddleware 
} = require('simple-command-bus');

// CreateAccount Command
class CreateAccountCommand extends Command {
	constructor(firstName, lastName) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
	}
}

// CreateAccount Handler
class CreateAccountHandler {
	handle(command) {
		// Logic to create an account.
	}
};

// Handler midleware
var commandHandlerMiddleware = new CommandHandlerMiddleware(
	new ClassNameExtractor(),
	new InMemoryLocator({ CreateAccountHandler: new CreateAccountHandler() }),
	new HandleInflector()
);

var commandBus = new CommandBus([
	new LoggerMiddleware(console),
	commandHandlerMiddleware
]);

const createAccountCommand = new CreateAccountCommand('John', 'Doe');
var result = commandBus.handle(createAccountCommand);
console.log('Result:', result);
```

## Check example
- `node examples/index.js`
