import { Flag } from "../../../types/index.js";
import { BaseError } from "../base/index.js";

export class APIError extends BaseError {
  constructor(
    message: string,
    hints?: unknown,
    output?: unknown
  ) {
    super(
      `[API Error] ${message}`,
      Flag.APIError,
      hints,
      output
    );
  }
}