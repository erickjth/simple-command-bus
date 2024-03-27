"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
class CreateAccountCommand extends lib_1.AbstractCommand {
}
class CreateAccountHandler extends lib_1.AbstractHandler {
    handle(command) {
        return new Promise(resolve => setTimeout(() => resolve(`Account created for ${command.payload.name} ${command.payload.last}`), 300));
    }
}
const commandHandlerMiddleware = new lib_1.CommandHandlerMiddleware(new lib_1.CommandToHandlerMapLocator([[CreateAccountCommand, new CreateAccountHandler()]]), new lib_1.HandleInflector());
const commandBus = new lib_1.CommandBus([new lib_1.LoggerMiddleware(console), commandHandlerMiddleware]);
(async function () {
    const createAccountCommand = new CreateAccountCommand({ name: 'John', last: 'Doe' });
    try {
        const result = await commandBus.handle(createAccountCommand);
        console.log('Result:', result);
    }
    catch (e) {
        console.log('Something went wrong', e);
    }
})();
//# sourceMappingURL=index.js.map