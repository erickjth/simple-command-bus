"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = require("lodash");

var _HandlerLocator2 = _interopRequireDefault(require("./HandlerLocator"));

var _MissingHandlerException = _interopRequireDefault(require("../../exceptions/MissingHandlerException"));

var _InvalidCommandException = _interopRequireDefault(require("../../exceptions/InvalidCommandException"));

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

var InMemoryLocator =
/*#__PURE__*/
function (_HandlerLocator) {
  _inherits(InMemoryLocator, _HandlerLocator);

  function InMemoryLocator() {
    var _this;

    var handlers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, InMemoryLocator);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InMemoryLocator).call(this));
    _this.handlers = {};

    if ((0, _lodash.isObject)(handlers)) {
      _this.handlers = (0, _lodash.reduce)(handlers, function (carry, Handler, key) {
        carry[key] = (0, _lodash.isFunction)(Handler) ? new Handler() : Handler; // eslint-disable-line

        return carry;
      }, {});
    }

    return _this;
  }

  _createClass(InMemoryLocator, [{
    key: "getHandlerForCommand",
    value: function getHandlerForCommand(commandName) {
      if ((0, _lodash.isString)(commandName) === false) {
        throw new _InvalidCommandException["default"]();
      }

      var handlerName = commandName.replace('Command', 'Handler');

      if ((0, _lodash.has)(this.handlers, handlerName) === false) {
        _MissingHandlerException["default"].forCommand(commandName);
      }

      return this.handlers[handlerName];
    }
  }]);

  return InMemoryLocator;
}(_HandlerLocator2["default"]);

exports["default"] = InMemoryLocator;