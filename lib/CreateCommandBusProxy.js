"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("./utils");

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var cachedCommands = {};

var CreateCommandBusProxy = function CreateCommandBusProxy(commandBus, commandsDir) {
  if (!commandsDir || !(0, _utils.isDirectory)(commandsDir)) {
    throw new Error('Invalid commands path.');
  }

  var availableCommands = (0, _utils.walkSync)(commandsDir);
  return new Proxy({}, {
    get: function get(target, propKey) {
      var commandName = "".concat((0, _utils.upperFirst)((0, _utils.camelCase)(propKey)), "Command.js");

      if (!cachedCommands[commandName]) {
        var foundCommand = availableCommands.find(function (command) {
          return command.endsWith(commandName);
        });

        if (!foundCommand) {
          throw new Error("Command \"".concat(commandName, "\" not found."));
        }

        cachedCommands[commandName] = require(foundCommand); // eslint-disable-line
      }

      var Command = cachedCommands[commandName];

      if ((0, _utils.isFunction)(Command) === false) {
        throw new Error("Command \"".concat(commandName, "\" is not callable."));
      }

      return function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return commandBus.handle(_construct(Command, args));
      };
    }
  });
};

var _default = CreateCommandBusProxy;
exports["default"] = _default;