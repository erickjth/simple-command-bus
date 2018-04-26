'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createException = require('./createException');

var _createException2 = _interopRequireDefault(_createException);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InvalidHandlerMethodException = (0, _createException2.default)('InvalidHandlerMethodException', {
	message: 'Invalid handler method.'
});

InvalidHandlerMethodException.forMethod = function (method) {
	throw new InvalidHandlerMethodException('Invalid handler method ' + method + '.');
};

exports.default = InvalidHandlerMethodException;