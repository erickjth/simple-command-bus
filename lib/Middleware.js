"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Abstract class for a middleware
 */
var Middleware =
/*#__PURE__*/
function () {
  function Middleware() {
    _classCallCheck(this, Middleware);
  }

  _createClass(Middleware, [{
    key: "execute",
    value: function execute(command, next) {
      throw new Error('execute method must be implemented');
    }
  }]);

  return Middleware;
}();

exports["default"] = Middleware;