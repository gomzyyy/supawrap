// errors/validation-error/index.ts
import { Flag } from "../../../types/index.js";
import { BaseError } from "../base/index.js";

export class ValidationError extends BaseError {
  constructor(message: string) {
    super(`[Validation Error] ${message}`, Flag.ValidationError);
  }
}