import MethodNameInflector from './MethodNameInflector';

export default class ClassNameInflector extends MethodNameInflector {
    constructor(methodName) {
        super();
        this.methodName = methodName || "handle";
    }
    inflect(commandName, handler) {
        return this.methodName + commandName;
    }
};