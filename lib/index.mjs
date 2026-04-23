var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

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
import lod from "lodash";

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
  if (lod.isObject(middleware)) {
    message = `Middleware ${middleware.constructor.name} is invalid. It must extend from Middleware`;
  }
  throw new InvalidMiddlewareException(message);
};
var InvalidMiddlewareException_default = InvalidMiddlewareException;

// src/exceptions/InvalidCommandException.js
import lod2 from "lodash";
var InvalidCommandException = createException("InvalidCommandException", {
  message: "Invalid Command"
});
InvalidCommandException.forCommand = (command) => {
  let message = null;
  if (lod2.isObject(command)) {
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
import fs from "fs";
import path from "path";
import capitalizeStr from "lodash/capitalize";
import camelCaseStr from "lodash/camelCase";
import upperFirstStr from "lodash/upperFirst";
var isDirectory = (dir) => fs.lstatSync(dir).isDirectory();
var walkSync = (file) => isDirectory(file) ? fs.readdirSync(file).map((f) => walkSync(path.join(file, f))) : file;
var camelCase = (s) => camelCaseStr(s);
var upperFirst = (s) => upperFirstStr(s);
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
        cachedCommands[commandName] = __require(foundCommand);
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
import lod3 from "lodash";
var MissingHandlerException = createException("MissingHandlerException", {
  message: "Invalid Command"
});
MissingHandlerException.forCommand = (commandName) => {
  let message = null;
  if (lod3.isString(commandName)) {
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
import lod4 from "lodash";

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
    if (handler && lod4.isFunction(handler[methodName])) {
      result = handler[methodName].call(handler, command);
    }
    return result || null;
  }
};

// src/handler/CommandNameExtractor/ClassNameExtractor.js
import lod5 from "lodash";
var ClassNameExtractor = class extends CommandNameExtractor {
  extractName(command) {
    if (lod5.isObject(command) === false || lod5.isString(command.constructor.name) === false) {
      throw new InvalidCommandException_default("Invalid Command Name.");
    }
    return command.constructor.name;
  }
};

// src/handler/MethodNameInflector/HandleInflector.js
import lod6 from "lodash";
var HandleInflector = class extends MethodNameInflector {
  constructor(methodName) {
    super();
    this.methodName = methodName || "handle";
  }
  inflect(commandName, handler) {
    if (lod6.isFunction(handler[this.methodName]) === false) {
      InvalidHandlerMethodException_default.forMethod(this.methodName);
    }
    return this.methodName;
  }
};

// src/handler/Locator/InMemoryLocator.js
import lod7 from "lodash";
var InMemoryLocator = class extends HandlerLocator {
  constructor(handlers = {}) {
    super();
    this.handlers = {};
    if (lod7.isObject(handlers)) {
      this.handlers = lod7.reduce(handlers, (carry, Handler, key) => {
        carry[key] = lod7.isFunction(Handler) ? new Handler() : Handler;
        return carry;
      }, {});
    }
  }
  getHandlerForCommand(commandName) {
    if (lod7.isString(commandName) === false) {
      throw new InvalidCommandException_default();
    }
    const handlerName = commandName.replace("Command", "Handler");
    if (lod7.has(this.handlers, handlerName) === false) {
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
      const HandlerModule = __require(filePath);
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
export {
  ClassNameExtractor,
  Command,
  CommandBus,
  CommandHandlerMiddleware,
  CommandNameExtractor,
  CreateCommandBusProxy_default as CreateCommandBusProxy,
  HandleInflector,
  HandlerLocator,
  InMemoryLocator,
  InvalidCommandException_default as InvalidCommandException,
  InvalidHandlerMethodException_default as InvalidHandlerMethodException,
  InvalidMiddlewareException_default as InvalidMiddlewareException,
  LoggerMiddleware,
  MethodNameInflector,
  Middleware,
  MissingHandlerException_default as MissingHandlerException,
  NamespaceHandlerLocator,
  index_default as default
};
