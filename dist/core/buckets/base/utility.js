import { APIResponse } from "../../response/index.js";
import { BaseError } from "../../errors/index.js";
import { Flag } from "../../../types/index.js";
/**
 * @underdevelopment - Please note that BucketUtilityMethods is currently under development and may undergo significant changes. The current implementation serves as a foundational structure for bucket-related operations, but we are actively working on refining the API, enhancing error handling, and optimizing performance. We recommend using this class for testing and prototyping purposes, but be prepared for potential breaking changes in future releases as we continue to improve and expand its capabilities.
 *
 * BucketUtilityMethods is a utility class that provides foundational methods for handling bucket operations in Supabase. It includes functionalities for building file paths, managing loading states, and handling errors. This class is designed to be extended by specific bucket wrapper classes, allowing for code reuse and consistency across different bucket implementations. The methods in this class are intended to assist developers in managing file uploads, transformations, and searches within Supabase storage buckets while providing robust error handling and debugging support.
 */
export class BucketUtilityMethods {
    supabase;
    bucketName;
    behaviour;
    constructor(supabase, bucketName, behaviour = {
        debug: {
            returnHintsOnError: false,
        },
    }) {
        this.supabase = supabase;
        this.bucketName = bucketName;
        this.behaviour = behaviour;
    }
    buildPath({ folder, fileName, extension, }) {
        const cleanFolder = folder ? `${folder.replace(/\/$/, "")}/` : "";
        const ext = extension ? `.${extension.replace(".", "")}` : "";
        return `${cleanFolder}${fileName}${ext}`;
    }
    buildTimestampPath(fileName, extension, folder) {
        const timestamp = Date.now();
        return this.buildPath({
            folder,
            fileName: `${timestamp}-${fileName}`,
            extension,
        });
    }
    getDebugLogs(metaData) {
        if (this.behaviour.debug?.returnHintsOnError) {
            return {
                ...metaData,
                bucket: this.bucketName,
                bucketBehaviour: this.behaviour,
            };
        }
        return null;
    }
    async withLoading(cbs, cb) {
        cbs?.onLoadingStateChange?.(true);
        try {
            return await cb();
        }
        finally {
            cbs?.onLoadingStateChange?.(false);
        }
    }
    handleError(error) {
        if (error instanceof BaseError) {
            return new APIResponse(null, error.flag, {
                message: error.message,
                hints: error.hints,
                output: error.output,
            }).build();
        }
        return new APIResponse(null, Flag.InternalError, {
            output: error,
        }).build();
    }
    isEmptyPayload(payload) {
        return !payload || Object.keys(payload).length === 0;
    }
    info() {
        return {
            bucketName: this.bucketName,
        };
    }
}
