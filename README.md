# Simple Command Bus

A Node.js library that implements the Command Bus pattern. It is a simple and easy-to-use library that allows you to create commands and handlers to separate the logic of your application. 100% written in TypeScript. It supports middlewares, logging, and more.

<hr />

[![npm](https://badge.fury.io/js/simple-command-bus.svg)](https://badge.fury.io/js/simple-command-bus)
[![testing](https://github.com/erickjth/simple-command-bus/actions/workflows/ci.yml/badge.svg)](https://github.com/erickjth/simple-command-bus/actions)

# Requirements

This project requires nodejs 18 or higher.

# Install

`npm install simple-command-bus`

or

`yarn add simple-command-bus`

# Basic Usage

Create a command and handler

```ts
import { AbstractCommand, AbstractHandler } from 'simple-command-bus';

// CreateAccount Command
type Payload = { firstName: string; lastName: string };

type Return = { id: string; firstName: string; lastName: string };

// The command class must extend AbstractCommand, and pass the payload type and the return type
class CreateAccountCommand extends AbstractCommand<Payload, Return> {
  // The constructor is handled by the AbstractCommand class
}

// CreateAccount Handler
class CreateAccountHandler extends AbstractHandler<CreateAccountCommand> {
  handle(command: CreateAccountCommand) {
    // Logic to create an account...
  }
}
```

Setup the command bus

```ts
import {
	CommandBus,
	CommandHandlerMiddleware,
	ClassNameExtractor,
	CommandToHandlerMapLocator,
	HandleInflector,
	LoggerMiddleware,
} from 'simple-command-bus';

const commandHandlerMiddleware = ;

const commandBus = new CommandBus([
	new LoggerMiddleware(console),
	new CommandHandlerMiddleware(
		new CommandToHandlerMapLocator([
			[CreateAccountCommand, new CreateAccountHandler()]
		]),
		new HandleInflector()
	)
]);
```

# Tests

`pnpm run test`

# Check examples

For more examples, check the `examples` folder.

# Credits

This library is majorly inspired by [Tactician Command Bus](https://tactician.thephpleague.com/) for PHP
