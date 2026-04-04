import { Flag } from "../../../types/index.js";
import { BaseError } from "../base/index.js";
export class InternalError extends BaseError {
    constructor(message = "Internal server error occured.", output) {
        super(`[Internal Error] ${message}`, Flag.InternalError, undefined, output);
    }
}
