"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Middleware = _interopRequireDefault(require("./Middleware"));

var _Command = _interopRequireDefault(require("./Command"));

var _InvalidMiddlewareException = _interopRequireDefault(require("./exceptions/InvalidMiddlewareException"));

var _InvalidCommandException = _interopRequireDefault(require("./exceptions/InvalidCommandException"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Intend to define private property
var stack = Symbol('stack');
/**
 * Bus that run and handle commands through middlewares
 */

var commandBus =
/*#__PURE__*/
function () {
  function commandBus() {
    var middlewares = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, commandBus);

    this[stack] = middlewares;
  }

  _createClass(commandBus, [{
    key: "getMiddlewareStack",
    value: function getMiddlewareStack() {
      return this[stack];
    }
  }, {
    key: "handle",
    value: function handle(command) {
      if (command instanceof _Command["default"] === false) {
        _InvalidCommandException["default"].forCommand(command);
      }

      var runCommandInMiddlewareStack = this[stack].reduceRight(function (next, middleware) {
        if (middleware instanceof _Middleware["default"] === false) {
          _InvalidMiddlewareException["default"].forMiddleware(middleware);
        }

        return middleware.execute.bind(middleware, command, next);
      }, function () {
        return null;
      });
      var result = runCommandInMiddlewareStack();
      return result;
    }
  }]);

  return commandBus;
}();

exports["default"] = commandBus;