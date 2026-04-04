import { BaseError } from "../base/index.js";
export declare class InternalError<T = unknown> extends BaseError {
    constructor(message?: string, output?: T);
}
