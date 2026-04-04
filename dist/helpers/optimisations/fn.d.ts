export declare function debounce<T extends (...args: any[]) => unknown>(fn: T, delay?: number): (...args: Parameters<T>) => void;
export declare function throttle<R, T extends (...args: any[]) => R>(fn: T, limit?: number): (...args: Parameters<T>) => void;
