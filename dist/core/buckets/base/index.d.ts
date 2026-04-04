import { SupabaseClient } from "@supabase/supabase-js";
import { BucketUtilityMethods } from "./utility.js";
import { BucketBehaviour, OnLoadingStateChangeCallback, UploadOptions, TransformOptions, SearchOptions } from "@/types/index.js";
export declare class BaseBucketWrapper extends BucketUtilityMethods {
    constructor(bucketName: string, supabase: SupabaseClient, behaviour?: BucketBehaviour);
    private bucket;
    uploadOne(path: string, file: File | Blob, opts?: UploadOptions, cbs?: OnLoadingStateChangeCallback): Promise<import("@/types/index.js").Response<any, unknown> | {
        id: string;
        path: string;
        fullPath: string;
    }>;
    uploadMany(files: {
        path: string;
        file: File | Blob;
        options?: UploadOptions;
    }[], cbs?: OnLoadingStateChangeCallback): Promise<import("@/types/index.js").Response<any, unknown> | ({
        data: {
            id: string;
            path: string;
            fullPath: string;
        };
        error: null;
    } | {
        data: null;
        error: import("@supabase/storage-js").StorageError;
    })[]>;
    deleteOne(path: string, cbs?: OnLoadingStateChangeCallback): Promise<import("@/types/index.js").Response<any, unknown> | import("@supabase/storage-js").FileObject[]>;
    deleteMany(paths: string[], cbs?: OnLoadingStateChangeCallback): Promise<import("@/types/index.js").Response<any, unknown> | import("@supabase/storage-js").FileObject[]>;
    downloadOne(path: string, opts?: {
        transform?: TransformOptions;
    }, cbs?: OnLoadingStateChangeCallback): Promise<import("@/types/index.js").Response<any, unknown> | Blob>;
    getPublicUrl(path: string, opts?: {
        download?: string | boolean;
        transform?: TransformOptions;
    }): string;
    getSignedUrl(path: string, expiresIn?: number): Promise<import("@/types/index.js").Response<any, unknown> | {
        signedUrl: string;
    }>;
    list(folder?: string, searchOptions?: SearchOptions): Promise<any[] | any>;
    move(fromPath: string, toPath: string): Promise<import("@/types/index.js").Response<any, unknown> | {
        message: string;
    }>;
    exists(path: string): Promise<any>;
}
