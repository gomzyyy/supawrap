import { BucketBehaviour, Callbacks, Response, PathBuilderOptions } from "../../../types/index.js";
import { SupabaseClient } from "@supabase/supabase-js";
/**
 * @underdevelopment - Please note that BucketUtilityMethods is currently under development and may undergo significant changes. The current implementation serves as a foundational structure for bucket-related operations, but we are actively working on refining the API, enhancing error handling, and optimizing performance. We recommend using this class for testing and prototyping purposes, but be prepared for potential breaking changes in future releases as we continue to improve and expand its capabilities.
 *
 * BucketUtilityMethods is a utility class that provides foundational methods for handling bucket operations in Supabase. It includes functionalities for building file paths, managing loading states, and handling errors. This class is designed to be extended by specific bucket wrapper classes, allowing for code reuse and consistency across different bucket implementations. The methods in this class are intended to assist developers in managing file uploads, transformations, and searches within Supabase storage buckets while providing robust error handling and debugging support.
 */
export declare class BucketUtilityMethods {
    protected readonly supabase: SupabaseClient;
    protected readonly bucketName: string;
    protected readonly behaviour: BucketBehaviour;
    constructor(supabase: SupabaseClient, bucketName: string, behaviour?: BucketBehaviour);
    protected buildPath({ folder, fileName, extension, }: PathBuilderOptions): string;
    protected buildTimestampPath(fileName: string, extension?: string, folder?: string): string;
    protected getDebugLogs(metaData: any): any;
    protected withLoading<T>(cbs: Callbacks | undefined, cb: () => Promise<T>): Promise<T>;
    protected handleError(error: unknown): Response<any>;
    protected isEmptyPayload(payload: object): boolean;
    protected info(): {
        bucketName: string;
    };
}
