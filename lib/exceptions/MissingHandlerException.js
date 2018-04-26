'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _createException = require('./createException');

var _createException2 = _interopRequireDefault(_createException);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MissingHandlerException = (0, _createException2.default)('MissingHandlerException', {
	message: 'Invalid Command'
});

MissingHandlerException.forCommand = function (commandName) {
	var message = null;

	if ((0, _lodash.isString)(commandName)) {
		message = 'There is no a handler for "' + commandName + '" Command.';
	}

	throw new MissingHandlerException(message);
};

exports.default = MissingHandlerException;