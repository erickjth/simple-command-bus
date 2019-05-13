"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = require("lodash");

var _CommandNameExtractor = _interopRequireDefault(require("./CommandNameExtractor/CommandNameExtractor"));

var _MethodNameInflector = _interopRequireDefault(require("./MethodNameInflector/MethodNameInflector"));

var _HandlerLocator = _interopRequireDefault(require("./Locator/HandlerLocator"));

var _Middleware2 = _interopRequireDefault(require("../Middleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// Intend to define private property
var _commandNameExtractor = Symbol('commandNameExtractor');

var _handlerLocator = Symbol('handlerLocator');

var _methodNameInflector = Symbol('methodNameInflector');

var CommandHandlerMiddleware =
/*#__PURE__*/
function (_Middleware) {
  _inherits(CommandHandlerMiddleware, _Middleware);

  function CommandHandlerMiddleware(commandNameExtractor, handlerLocator, methodNameInflector) {
    var _this;

    _classCallCheck(this, CommandHandlerMiddleware);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CommandHandlerMiddleware).call(this));
    _this[_commandNameExtractor] = commandNameExtractor;
    _this[_handlerLocator] = handlerLocator;
    _this[_methodNameInflector] = methodNameInflector;
    return _this;
  }

  _createClass(CommandHandlerMiddleware, [{
    key: "execute",
    value: function execute(command, next) {
      var commandName = null;
      var handler = null;
      var methodName = null;
      var result = null;

      if (this[_commandNameExtractor] instanceof _CommandNameExtractor["default"]) {
        commandName = this[_commandNameExtractor].extractName(command);
      }

      if (commandName && this[_handlerLocator] instanceof _HandlerLocator["default"]) {
        handler = this[_handlerLocator].getHandlerForCommand(commandName);
      }

      if (commandName && handler && this[_methodNameInflector] instanceof _MethodNameInflector["default"]) {
        methodName = this[_methodNameInflector].inflect(commandName, handler);
      }

      if (handler && (0, _lodash.isFunction)(handler[methodName])) {
        result = handler[methodName].call(handler, command);
      }

      return result || null;
    }
  }, {
    key: "commandNameExtractor",
    set: function set(commandNameExtractor) {
      this[_commandNameExtractor] = commandNameExtractor;
    }
  }, {
    key: "handlerLocator",
    set: function set(handlerLocator) {
      this[_handlerLocator] = handlerLocator;
    }
  }, {
    key: "methodNameInflector",
    set: function set(methodNameInflector) {
      this[_methodNameInflector] = methodNameInflector;
    }
  }]);

  return CommandHandlerMiddleware;
}(_Middleware2["default"]);

exports["default"] = CommandHandlerMiddleware;