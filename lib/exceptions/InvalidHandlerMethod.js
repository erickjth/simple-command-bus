'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createException = require('./createException');

var _createException2 = _interopRequireDefault(_createException);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InvalidHandlerMethod = (0, _createException2.default)('InvalidHandlerMethod', {
	message: 'Invalid handler method.'
});

InvalidHandlerMethod.forMethod = function (method) {
	throw new InvalidHandlerMethod('Invalid handler method ' + method + '.');
};

exports.default = InvalidHandlerMethod;