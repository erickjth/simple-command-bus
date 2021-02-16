import MethodNameInflector from './MethodNameInflector';

export default class HandleClassNameInflector extends MethodNameInflector {

    inflect(commandName, handler) {
        return 'handle' + commandName;
    }
    
};