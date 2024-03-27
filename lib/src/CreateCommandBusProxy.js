"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const cachedCommands = {};
const CreateCommandBusProxy = function CreateCommandBusProxy(commandBus, commandsDir) {
    if (!commandsDir || !(0, utils_1.isDirectory)(commandsDir)) {
        throw new Error('Invalid commands path.');
    }
    const availableCommands = (0, utils_1.walkSync)(commandsDir).reduce((carry, command) => {
        const fileName = command.split('/').pop();
        const commandName = fileName.split('.').slice(0, -1).join('.');
        if (commandName) {
            const key = (0, utils_1.camelCase)(commandName).replace(/command|Command$/, '');
            return {
                ...carry,
                [key]: command,
            };
        }
        return carry;
    }, {});
    return new Proxy({}, {
        get(target, propKey) {
            const commandName = (0, utils_1.camelCase)(propKey);
            if (!cachedCommands[commandName]) {
                const foundCommand = availableCommands === null || availableCommands === void 0 ? void 0 : availableCommands[commandName];
                if (!foundCommand) {
                    throw new Error(`Command "${commandName}" not found.`);
                }
                cachedCommands[commandName] = require(foundCommand);
            }
            const CommandToHandle = cachedCommands[commandName];
            if ((0, utils_1.isFunction)(CommandToHandle) === false) {
                throw new Error(`Command "${commandName}" is not callable.`);
            }
            return (...args) => commandBus.handle(new CommandToHandle(...args));
        },
    });
};
exports.default = CreateCommandBusProxy;
//# sourceMappingURL=CreateCommandBusProxy.js.map