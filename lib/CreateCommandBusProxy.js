'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = require('./utils');

var cachedCommands = {};

var CreateCommandBusProxy = function CreateCommandBusProxy(commandBus, commandsDir) {
	if (!commandsDir || !(0, _utils.isDirectory)(commandsDir)) {
		throw new Error('Invalid commands path.');
	}

	var availableCommands = (0, _utils.walkSync)(commandsDir);

	return new Proxy({}, {
		get: function get(target, propKey) {
			var commandName = (0, _utils.upperFirst)((0, _utils.camelCase)(propKey)) + 'Command.js';

			if (!cachedCommands[commandName]) {
				var foundCommand = availableCommands.find(function (command) {
					return command.endsWith(commandName);
				});

				if (!foundCommand) {
					throw new Error('Command "' + commandName + '" not found.');
				}

				cachedCommands[commandName] = require(foundCommand); // eslint-disable-line
			}

			var Command = cachedCommands[commandName];

			if ((0, _utils.isFunction)(Command) === false) {
				throw new Error('Command "' + commandName + '" is not callable.');
			}

			return function () {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				return commandBus.handle(new (Function.prototype.bind.apply(Command, [null].concat(args)))());
			};
		}
	});
};

exports.default = CreateCommandBusProxy;