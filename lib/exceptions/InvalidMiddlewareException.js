"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = require("lodash");

var _createException = _interopRequireDefault(require("./createException"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var InvalidMiddlewareException = (0, _createException["default"])('InvalidMiddlewareException', {
  message: 'Invalid Middleware'
});

InvalidMiddlewareException.forMiddleware = function (middleware) {
  var message = null;

  if ((0, _lodash.isObject)(middleware)) {
    message = "Middleware ".concat(middleware.constructor.name, " is invalid. It must extend from Middleware");
  }

  throw new InvalidMiddlewareException(message);
};

var _default = InvalidMiddlewareException;
exports["default"] = _default;