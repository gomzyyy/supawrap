import { Flag } from "../core/api/common.js";
import type { PayloadCallbacks, OnLoadingStateChangeCallback, ValidatorCallback } from "./cb.js";
export type CommonCBArgs = {
    error?: unknown;
    data?: any;
    message?: string;
    flag?: Flag;
};
export interface CBArgs {
    onSuccessArgs: CommonCBArgs;
    onFailArgs: CommonCBArgs;
    handleLoadingState: boolean;
}
export interface Callbacks extends OnLoadingStateChangeCallback, ValidatorCallback, PayloadCallbacks {
}
