import { Flag } from "../../../types/index.js";
export declare class BaseError extends Error {
    flag: Flag;
    hints?: any;
    output?: any;
    constructor(message: string, flag: Flag, hints?: any, output?: any);
}
