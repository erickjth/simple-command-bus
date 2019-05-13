"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = require("lodash");

var _createException = _interopRequireDefault(require("./createException"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var InvalidCommandException = (0, _createException["default"])('InvalidCommandException', {
  message: 'Invalid Command'
});

InvalidCommandException.forCommand = function (command) {
  var message = null;

  if ((0, _lodash.isObject)(command)) {
    message = "Command ".concat(command.constructor.name, " is invalid. It must extend from Command.");
  }

  throw new InvalidCommandException(message);
};

var _default = InvalidCommandException;
exports["default"] = _default;