import { Flag } from "../../types/index.js";
export class APIResponse {
    data;
    flag;
    error;
    constructor(data, flag = Flag.UnknownOrSuccess, error) {
        this.data = data;
        this.flag = flag;
        this.error = error;
    }
    build() {
        return {
            error: this.error,
            data: this.data,
            flag: this.flag,
        };
    }
}
