// errors/base/index.ts
import { Flag } from "../../../types/index.js";

export class BaseError extends Error {
  public flag: Flag;
  public hints?: any;
  public output?: any;

  constructor(
    message: string,
    flag: Flag,
    hints?: any,
    output?: any
  ) {
    super(message);

    this.name = this.constructor.name;
    this.flag = flag;
    this.hints = hints;
    this.output = output;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}