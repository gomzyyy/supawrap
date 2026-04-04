import { BaseError } from "../base/index.js";
export declare class APIError extends BaseError {
    constructor(message: string, hints?: unknown, output?: unknown);
}
