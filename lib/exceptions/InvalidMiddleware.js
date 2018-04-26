'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _createException = require('./createException');

var _createException2 = _interopRequireDefault(_createException);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InvalidMiddleware = (0, _createException2.default)('InvalidMiddleware', {
	message: 'Invalid Middleware'
});

InvalidMiddleware.forMiddleware = function (middleware) {
	var message = null;

	if ((0, _lodash.isObject)(middleware)) {
		message = 'Middleware ' + middleware.constructor.name + ' is invalid. It must extend from Middleware';
	}

	throw new InvalidMiddleware(message);
};

exports.default = InvalidMiddleware;