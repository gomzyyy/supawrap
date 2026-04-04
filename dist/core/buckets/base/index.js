import { BucketUtilityMethods } from "./utility.js";
export class BaseBucketWrapper extends BucketUtilityMethods {
    constructor(bucketName, supabase, behaviour = {
        debug: {
            returnHintsOnError: true,
        },
    }) {
        super(supabase, bucketName, behaviour);
    }
    bucket() {
        return this.supabase.storage.from(this.bucketName);
    }
    async uploadOne(path, file, opts = {}, cbs) {
        return this.withLoading(cbs, async () => {
            try {
                const { data, error } = await this.bucket().upload(path, file, {
                    upsert: opts.upsert ?? false,
                    contentType: opts.contentType,
                    cacheControl: opts.cacheControl,
                });
                if (error)
                    throw error;
                return data;
            }
            catch (error) {
                return this.handleError(error);
            }
        });
    }
    async uploadMany(files, cbs) {
        return this.withLoading(cbs, async () => {
            try {
                const results = await Promise.all(files.map((item) => this.bucket().upload(item.path, item.file, {
                    upsert: item.options?.upsert ?? false,
                    contentType: item.options?.contentType,
                    cacheControl: item.options?.cacheControl,
                })));
                return results;
            }
            catch (error) {
                return this.handleError(error);
            }
        });
    }
    async deleteOne(path, cbs) {
        return this.withLoading(cbs, async () => {
            return this.deleteMany([path]);
        });
    }
    async deleteMany(paths, cbs) {
        return this.withLoading(cbs, async () => {
            try {
                const { data, error } = await this.bucket().remove(paths);
                if (error)
                    throw error;
                return data;
            }
            catch (error) {
                return this.handleError(error);
            }
        });
    }
    async downloadOne(path, opts, cbs) {
        return this.withLoading(cbs, async () => {
            try {
                const { data, error } = await this.bucket().download(path, opts);
                if (error)
                    throw error;
                return data;
            }
            catch (error) {
                return this.handleError(error);
            }
        });
    }
    getPublicUrl(path, opts) {
        const { data } = this.bucket().getPublicUrl(path, opts);
        return data.publicUrl;
    }
    async getSignedUrl(path, expiresIn = 60 * 60) {
        try {
            const { data, error } = await this.bucket().createSignedUrl(path, expiresIn);
            if (error)
                throw error;
            return data;
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async list(folder, searchOptions) {
        try {
            const { data, error } = await this.bucket().list(folder, searchOptions);
            if (error)
                throw error;
            return data;
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async move(fromPath, toPath) {
        try {
            const { data, error } = await this.bucket().move(fromPath, toPath);
            if (error)
                throw error;
            return data;
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async exists(path) {
        try {
            const files = await this.list(path);
            return files?.some((file) => file.name === path);
        }
        catch {
            return false;
        }
    }
}
