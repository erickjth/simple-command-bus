"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createException;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function createException(name, options) {
  var Exception = function Exception(message, code) {
    _classCallCheck(this, Exception);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }

    this.message = options.message || message;
    this.code = options.code || code;
  };

  Exception.prototype = new Error();
  Exception.prototype.name = name;
  Exception.prototype.type = 'Exception';
  Exception.prototype.constructor = Exception;
  return Exception;
}