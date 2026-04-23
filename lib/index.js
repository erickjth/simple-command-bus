var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.js
var index_exports = {};
__export(index_exports, {
  ClassNameExtractor: () => ClassNameExtractor,
  Command: () => Command,
  CommandBus: () => CommandBus,
  CommandHandlerMiddleware: () => CommandHandlerMiddleware,
  CommandNameExtractor: () => CommandNameExtractor,
  CreateCommandBusProxy: () => CreateCommandBusProxy_default,
  HandleInflector: () => HandleInflector,
  HandlerLocator: () => HandlerLocator,
  InMemoryLocator: () => InMemoryLocator,
  InvalidCommandException: () => InvalidCommandException_default,
  InvalidHandlerMethodException: () => InvalidHandlerMethodException_default,
  InvalidMiddlewareException: () => InvalidMiddlewareException_default,
  LoggerMiddleware: () => LoggerMiddleware,
  MethodNameInflector: () => MethodNameInflector,
  Middleware: () => Middleware,
  MissingHandlerException: () => MissingHandlerException_default,
  NamespaceHandlerLocator: () => NamespaceHandlerLocator,
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

// src/Middleware.js
var Middleware = class {
  execute(command, next) {
    throw new Error("execute method must be implemented");
  }
};

// src/Command.js
var Command = class {
};

// src/exceptions/InvalidMiddlewareException.js
var import_lodash = __toESM(require("lodash"));

// src/exceptions/createException.js
function createException(name, options = {}) {
  class Exception extends Error {
    constructor(message, code) {
      super(options.message || message);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.stack = new Error().stack;
      }
      this.code = options.code || code;
    }
  }
  Exception.prototype.name = name;
  Exception.prototype.type = "Exception";
  Exception.prototype.constructor = Exception;
  return Exception;
}

// src/exceptions/InvalidMiddlewareException.js
var InvalidMiddlewareException = createException("InvalidMiddlewareException", {
  message: "Invalid Middleware"
});
InvalidMiddlewareException.forMiddleware = (middleware) => {
  let message = null;
  if (import_lodash.default.isObject(middleware)) {
    message = `Middleware ${middleware.constructor.name} is invalid. It must extend from Middleware`;
  }
  throw new InvalidMiddlewareException(message);
};
var InvalidMiddlewareException_default = InvalidMiddlewareException;

// src/exceptions/InvalidCommandException.js
var import_lodash2 = __toESM(require("lodash"));
var InvalidCommandException = createException("InvalidCommandException", {
  message: "Invalid Command"
});
InvalidCommandException.forCommand = (command) => {
  let message = null;
  if (import_lodash2.default.isObject(command)) {
    message = `Command ${command.constructor.name} is invalid. It must extend from Command.`;
  }
  throw new InvalidCommandException(message);
};
var InvalidCommandException_default = InvalidCommandException;

// src/CommandBus.js
var stack = /* @__PURE__ */ Symbol("stack");
var CommandBus = class {
  constructor(middlewares = []) {
    this[stack] = middlewares;
  }
  getMiddlewareStack() {
    return this[stack];
  }
  handle(command) {
    if (command instanceof Command === false) {
      InvalidCommandException_default.forCommand(command);
    }
    const runCommandInMiddlewareStack = this[stack].reduceRight(
      (next, middleware) => {
        if (middleware instanceof Middleware === false) {
          InvalidMiddlewareException_default.forMiddleware(middleware);
        }
        return middleware.execute.bind(middleware, command, next);
      },
      () => null
    );
    const result = runCommandInMiddlewareStack();
    return result;
  }
};

// src/utils.js
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_capitalize = __toESM(require("lodash/capitalize"));
var import_camelCase = __toESM(require("lodash/camelCase"));
var import_upperFirst = __toESM(require("lodash/upperFirst"));
var isDirectory = (dir) => import_fs.default.lstatSync(dir).isDirectory();
var walkSync = (file) => isDirectory(file) ? import_fs.default.readdirSync(file).map((f) => walkSync(import_path.default.join(file, f))) : file;
var camelCase = (s) => (0, import_camelCase.default)(s);
var upperFirst = (s) => (0, import_upperFirst.default)(s);
var isString = (s) => typeof s === "string";
var isFunction = (f) => typeof f === "function";

// src/CreateCommandBusProxy.js
var cachedCommands = {};
var CreateCommandBusProxy = function CreateCommandBusProxy2(commandBus, commandsDir) {
  if (!commandsDir || !isDirectory(commandsDir)) {
    throw new Error("Invalid commands path.");
  }
  const availableCommands = walkSync(commandsDir);
  return new Proxy({}, {
    get(target, propKey) {
      const commandName = `${upperFirst(camelCase(propKey))}Command.js`;
      if (!cachedCommands[commandName]) {
        const foundCommand = availableCommands.find((command) => command.endsWith(commandName));
        if (!foundCommand) {
          throw new Error(`Command "${commandName}" not found.`);
        }
        cachedCommands[commandName] = require(foundCommand);
      }
      const Command2 = cachedCommands[commandName];
      if (isFunction(Command2) === false) {
        throw new Error(`Command "${commandName}" is not callable.`);
      }
      return (...args) => commandBus.handle(new Command2(...args));
    }
  });
};
var CreateCommandBusProxy_default = CreateCommandBusProxy;

// src/exceptions/InvalidHandlerMethodException.js
var InvalidHandlerMethodException = createException("InvalidHandlerMethodException", {
  message: "Invalid handler method."
});
InvalidHandlerMethodException.forMethod = (method) => {
  throw new InvalidHandlerMethodException(`Invalid handler method ${method}.`);
};
var InvalidHandlerMethodException_default = InvalidHandlerMethodException;

// src/exceptions/MissingHandlerException.js
var import_lodash3 = __toESM(require("lodash"));
var MissingHandlerException = createException("MissingHandlerException", {
  message: "Invalid Command"
});
MissingHandlerException.forCommand = (commandName) => {
  let message = null;
  if (import_lodash3.default.isString(commandName)) {
    message = `There is no a handler for "${commandName}" Command.`;
  }
  throw new MissingHandlerException(message);
};
var MissingHandlerException_default = MissingHandlerException;

// src/plugins/LoggerMiddleware.js
var LoggerMiddleware = class extends Middleware {
  constructor(logger) {
    super();
    this.logger = logger;
  }
  execute(command, next) {
    this.logger.log("Before command: ", command);
    const returnValue = next(command);
    this.logger.log("After command result: ", command, returnValue);
    return returnValue;
  }
};

// src/handler/CommandHandlerMiddleware.js
var import_lodash4 = __toESM(require("lodash"));

// src/handler/CommandNameExtractor/CommandNameExtractor.js
var CommandNameExtractor = class {
  extractName(command) {
    throw new Error("extractName method must be implemented");
  }
};

// src/handler/MethodNameInflector/MethodNameInflector.js
var MethodNameInflector = class {
  inflect(command) {
    throw new Error("inflect method must be implemented");
  }
};

// src/handler/Locator/HandlerLocator.js
var HandlerLocator = class {
  getHandlerForCommand(command) {
    throw new Error("getHandlerForCommand method must be implemented");
  }
};

// src/handler/CommandHandlerMiddleware.js
var _commandNameExtractor = /* @__PURE__ */ Symbol("commandNameExtractor");
var _handlerLocator = /* @__PURE__ */ Symbol("handlerLocator");
var _methodNameInflector = /* @__PURE__ */ Symbol("methodNameInflector");
var CommandHandlerMiddleware = class extends Middleware {
  constructor(commandNameExtractor, handlerLocator, methodNameInflector) {
    super();
    this[_commandNameExtractor] = commandNameExtractor;
    this[_handlerLocator] = handlerLocator;
    this[_methodNameInflector] = methodNameInflector;
  }
  set commandNameExtractor(commandNameExtractor) {
    this[_commandNameExtractor] = commandNameExtractor;
  }
  set handlerLocator(handlerLocator) {
    this[_handlerLocator] = handlerLocator;
  }
  set methodNameInflector(methodNameInflector) {
    this[_methodNameInflector] = methodNameInflector;
  }
  execute(command, next) {
    let commandName = null;
    let handler = null;
    let methodName = null;
    let result = null;
    if (this[_commandNameExtractor] instanceof CommandNameExtractor) {
      commandName = this[_commandNameExtractor].extractName(command);
    }
    if (commandName && this[_handlerLocator] instanceof HandlerLocator) {
      handler = this[_handlerLocator].getHandlerForCommand(commandName);
    }
    if (commandName && handler && this[_methodNameInflector] instanceof MethodNameInflector) {
      methodName = this[_methodNameInflector].inflect(commandName, handler);
    }
    if (handler && import_lodash4.default.isFunction(handler[methodName])) {
      result = handler[methodName].call(handler, command);
    }
    return result || null;
  }
};

// src/handler/CommandNameExtractor/ClassNameExtractor.js
var import_lodash5 = __toESM(require("lodash"));
var ClassNameExtractor = class extends CommandNameExtractor {
  extractName(command) {
    if (import_lodash5.default.isObject(command) === false || import_lodash5.default.isString(command.constructor.name) === false) {
      throw new InvalidCommandException_default("Invalid Command Name.");
    }
    return command.constructor.name;
  }
};

// src/handler/MethodNameInflector/HandleInflector.js
var import_lodash6 = __toESM(require("lodash"));
var HandleInflector = class extends MethodNameInflector {
  constructor(methodName) {
    super();
    this.methodName = methodName || "handle";
  }
  inflect(commandName, handler) {
    if (import_lodash6.default.isFunction(handler[this.methodName]) === false) {
      InvalidHandlerMethodException_default.forMethod(this.methodName);
    }
    return this.methodName;
  }
};

// src/handler/Locator/InMemoryLocator.js
var import_lodash7 = __toESM(require("lodash"));
var InMemoryLocator = class extends HandlerLocator {
  constructor(handlers = {}) {
    super();
    this.handlers = {};
    if (import_lodash7.default.isObject(handlers)) {
      this.handlers = import_lodash7.default.reduce(handlers, (carry, Handler, key) => {
        carry[key] = import_lodash7.default.isFunction(Handler) ? new Handler() : Handler;
        return carry;
      }, {});
    }
  }
  getHandlerForCommand(commandName) {
    if (import_lodash7.default.isString(commandName) === false) {
      throw new InvalidCommandException_default();
    }
    const handlerName = commandName.replace("Command", "Handler");
    if (import_lodash7.default.has(this.handlers, handlerName) === false) {
      MissingHandlerException_default.forCommand(commandName);
    }
    return this.handlers[handlerName];
  }
};

// src/handler/Locator/NamespaceHandlerLocator.js
var NamespaceHandlerLocator = class extends HandlerLocator {
  constructor(handlersPath) {
    super();
    if (!handlersPath || !isDirectory(handlersPath)) throw new Error("Invalid commands path.");
    this.handlersMap = /* @__PURE__ */ new Map();
    const handlerPaths = walkSync(handlersPath);
    handlerPaths.forEach((filePath) => {
      const HandlerModule = require(filePath);
      const Handler = HandlerModule.default || HandlerModule;
      if (isFunction(Handler)) {
        const match = filePath.match(/([^/]+)\.js$/);
        if (match) this.handlersMap.set(match[1], Handler);
      }
    });
  }
  getHandlerForCommand(commandName) {
    if (!isString(commandName)) throw new InvalidCommandException_default();
    const handlerName = commandName.replace("Command", "Handler");
    const Handler = this.handlersMap.get(handlerName);
    if (!Handler) throw MissingHandlerException_default.forCommand(commandName);
    return new Handler();
  }
};

// src/index.js
var index_default = CommandBus;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ClassNameExtractor,
  Command,
  CommandBus,
  CommandHandlerMiddleware,
  CommandNameExtractor,
  CreateCommandBusProxy,
  HandleInflector,
  HandlerLocator,
  InMemoryLocator,
  InvalidCommandException,
  InvalidHandlerMethodException,
  InvalidMiddlewareException,
  LoggerMiddleware,
  MethodNameInflector,
  Middleware,
  MissingHandlerException,
  NamespaceHandlerLocator
});
