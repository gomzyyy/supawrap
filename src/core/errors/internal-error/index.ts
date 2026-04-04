import { Flag } from "../../../types/index.js";
import { BaseError } from "../base/index.js";

export class InternalError<T = unknown> extends BaseError {
  constructor(
    message = "Internal server error occured.",
    output?: T
  ) {
    super(
      `[Internal Error] ${message}`,
      Flag.InternalError,
      undefined,
      output
    );
  }
}