import { Flag, } from "../../../types/index.js";
import { BaseClientCRUDWrapper } from "../base/client/index.js";
import { APIResponse } from "@/core/response/index.js";
import { APIError } from "@/core/errors/index.js";
/**
 * ClientWrapper is a specialized CRUD wrapper for client-side operations on a specific table. It extends the BaseClientCRUDWrapper and provides additional utility methods like `exists` to check if a record exists and `count` to count the number of records based on certain criteria. This class is designed to be flexible and can be extended further with more client-specific methods as needed.
 */
export class ClientWrapper extends BaseClientCRUDWrapper {
    constructor(supabase, tableName, behaviour) {
        super(supabase, tableName, behaviour);
    }
    /**
     * @classmethod exists() Checks if a record with the specified ID exists in the table. It uses the `withLoading` method to manage loading state and accepts callbacks for additional control over the operation. The method returns a boolean indicating the existence of the record, wrapped in a Response object for consistent API responses.
     */
    async exists(tableId, cbs) {
        return this.withLoading(cbs, async () => {
            try {
                const { data, error } = await this.supabase
                    .from(this.tableName)
                    .select("*")
                    .eq("id", tableId)
                    .single();
                if (error) {
                    console.error("Error checking existence:", error);
                    throw new APIError("Failed to check existence", this.getDebugLogs({ error }));
                }
                return new APIResponse(!!data, Flag.Success).build();
            }
            catch (error) {
                console.error("Error checking existence:", error);
                return this.handleError(error);
            }
        });
    }
    /**
     * @classmethod count() Counts the number of records in the table that match the specified criteria. It accepts optional filtering options and callbacks for managing loading state. The method constructs a query based on the provided options, executes it, and returns the count of matching records wrapped in a Response object. If an error occurs during the operation, it is handled gracefully and returned as an APIError response.
     */
    async count(opts, cbs) {
        return this.withLoading(cbs, async () => {
            try {
                let query = this.supabase.from(this.tableName).select("*", {
                    count: "exact",
                    head: true,
                });
                if (opts) {
                    query = this.applyFilters(query, opts);
                }
                const { count, error } = await query;
                if (error) {
                    throw new APIError("Failed to count records", error.hint, error);
                }
                return new APIResponse(count ?? 0, Flag.Success).build();
            }
            catch (error) {
                return this.handleError(error);
            }
        });
    }
}
