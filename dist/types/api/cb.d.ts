export interface OnSuccessCallback<Args = unknown> {
    onSuccess?: (data: Args) => void | Promise<void>;
}
export interface OnFailCallback<Args = unknown> {
    onFail?: (err: Args) => void | Promise<void>;
}
export interface OnLoadingStateChangeCallback {
    onLoadingStateChange?: (state: boolean) => void;
}
export interface ValidatorCallback {
    validator?: () => boolean;
}
type AmendArgsCallback = <T, K>(args: {
    formData: Partial<T>;
}) => Partial<T> | (T & K);
export interface PayloadCallbacks {
    amendArgs?: AmendArgsCallback;
}
export {};
