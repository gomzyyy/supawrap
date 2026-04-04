import { Flag } from "../../../types/index.js";
import { BaseError } from "../base/index.js";
export class APIError extends BaseError {
    constructor(message, hints, output) {
        super(`[API Error] ${message}`, Flag.APIError, hints, output);
    }
}
