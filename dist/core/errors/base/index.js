export class BaseError extends Error {
    flag;
    hints;
    output;
    constructor(message, flag, hints, output) {
        super(message);
        this.name = this.constructor.name;
        this.flag = flag;
        this.hints = hints;
        this.output = output;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
