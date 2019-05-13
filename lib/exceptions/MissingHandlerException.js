"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = require("lodash");

var _createException = _interopRequireDefault(require("./createException"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MissingHandlerException = (0, _createException["default"])('MissingHandlerException', {
  message: 'Invalid Command'
});

MissingHandlerException.forCommand = function (commandName) {
  var message = null;

  if ((0, _lodash.isString)(commandName)) {
    message = "There is no a handler for \"".concat(commandName, "\" Command.");
  }

  throw new MissingHandlerException(message);
};

var _default = MissingHandlerException;
exports["default"] = _default;