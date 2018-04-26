'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _createException = require('./createException');

var _createException2 = _interopRequireDefault(_createException);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InvalidCommandException = (0, _createException2.default)('InvalidCommandException', {
	message: 'Invalid Command'
});

InvalidCommandException.forCommand = function (command) {
	var message = null;

	if ((0, _lodash.isObject)(command)) {
		message = 'Command ' + command.constructor.name + ' is invalid. It must extend from Command.';
	}

	throw new InvalidCommandException(message);
};

exports.default = InvalidCommandException;