export const commandHandledSymbol = Symbol('command-handled');
export class AbstractHandler {
    constructor() {
        return new Proxy(this, {
            get(target, prop, receiver) {
                if (prop in target && typeof Reflect.get(target, prop, receiver) === 'function') {
                    // return function with the handler method
                    return (command) => {
                        return Reflect.get(target, prop, receiver)(command);
                    };
                }
                return Reflect.get(target, prop, receiver);
            },
        });
    }
}
//# sourceMappingURL=AbstractHandler.js.map