import type { JSDataType } from "../types/index.js";
declare const validator: {
    response: {
        isValidJson: (str: string) => boolean;
        hasProperty: (obj: object | string, key: string) => boolean;
        isArray(arr: any): arr is any[];
        isValidObject(obj: any): boolean;
        isString(arg: any): boolean;
        isBoolean(arg: any): boolean;
        isNumber(arg: any): boolean;
    };
    form: {
        isEmail: (email: string) => boolean;
    };
    amend: {
        deleteKey<T extends Record<string, any>, K extends keyof T>(obj: T, key: K): Omit<T, K>;
        deleteKeyIteratable<T extends ReadonlyArray<Record<string, any>>, K extends Extract<keyof T[number], string>>(arr: T, key: K, opts?: {
            where?: {
                datatypes: Array<JSDataType>;
            };
        }): Array<Omit<T[number], K> | T[number]>;
        deleteUnwantedValues<T>(obj: T, datatypes: JSDataType[]): Partial<T>;
        overrideProperty<T extends Record<string, any>, K extends keyof T>(obj: T, key: K, value: T[K]): T;
    };
};
export { validator };
