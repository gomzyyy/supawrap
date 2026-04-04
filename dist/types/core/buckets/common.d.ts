export interface UploadOptions {
    upsert?: boolean;
    contentType?: string;
    cacheControl?: string;
}
export interface SignedUrlOptions {
    expiresIn?: number;
}
export interface TransformOptions {
    width?: number;
    height?: number;
    resize?: "cover" | "contain" | "fill";
    quality?: number;
    format?: "origin";
}
export interface SortBy {
    column?: string;
    order?: string;
}
export interface SearchOptions {
    limit?: number;
    offset?: number;
    sortBy?: SortBy;
    search?: string;
}
export interface PathBuilderOptions {
    folder?: string;
    fileName: string;
    extension?: string;
}
export type BucketType = 'STANDARD' | 'ANALYTICS';
export interface Bucket {
    id: string;
    type?: BucketType;
    name: string;
    owner: string;
    file_size_limit?: number;
    allowed_mime_types?: string[];
    created_at: string;
    updated_at: string;
    public: boolean;
}
export interface FileMetadata {
    eTag: string;
    size: number;
    mimetype: string;
    cacheControl: string;
    lastModified: string;
    contentLength: number;
    httpStatusCode: number;
    [key: string]: any;
}
export interface FileObject {
    name: string;
    id: string | null;
    updated_at: string | null;
    created_at: string | null;
    last_accessed_at: string | null;
    metadata: FileMetadata | null;
    bucket_id?: string;
    owner?: string;
    buckets?: Bucket;
}
