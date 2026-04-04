export declare function getDataType(value: unknown): JSDataType;
export type JSDataType = "string" | "number" | "boolean" | "object" | "function" | "undefined" | "bigint" | "symbol" | "null" | "emptystrings";
export declare function deleteUnwantedValues<T extends Record<string, any>>(obj: T, datatypes: JSDataType[]): Partial<T>;
