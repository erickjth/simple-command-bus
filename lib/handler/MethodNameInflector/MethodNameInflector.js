"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MethodNameInflector =
/*#__PURE__*/
function () {
  function MethodNameInflector() {
    _classCallCheck(this, MethodNameInflector);
  }

  _createClass(MethodNameInflector, [{
    key: "inflect",
    value: function inflect(command) {
      throw new Error('inflect method must be implemented');
    }
  }]);

  return MethodNameInflector;
}();

exports["default"] = MethodNameInflector;