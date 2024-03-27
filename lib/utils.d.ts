import isCallable from 'is-callable';
export declare const isDirectory: (dir: string) => boolean;
export declare const walkSync: (file: string) => any;
export declare const upperFirst: (s: string) => string;
export declare const isString: (s: any) => boolean;
export declare const isFunction: (f: any) => boolean;
/**
 * Convert a string to lower camel case. Example: "hello world" to "helloWorld"
 *
 * @param {string} s
 * @returns {string}
 */
export declare const lowerCamelCase: (s: string) => string;
/**
 * Convert a string to camel case. Example: "hello world" to "HelloWorld"
 *
 * @param {string} s
 * @return {string}
 */
export declare const camelCase: (s: string) => string;
export { isCallable };
declare const _default: {
    isDirectory: (dir: string) => boolean;
    walkSync: (file: string) => any;
    upperFirst: (s: string) => string;
    isString: (s: any) => boolean;
    isFunction: (f: any) => boolean;
    lowerCamelCase: (s: string) => string;
    camelCase: (s: string) => string;
    isCallable: any;
};
export default _default;
