import { SupabaseClient } from "@supabase/supabase-js";
import { Callbacks, GetTableOpts, Response, TableBehaviour, UpdateTableOpts } from "../../../types/index.js";
import { BaseClientCRUDWrapper } from "../base/client/index.js";
type ExistsFunctionOmitKeys = "validator" | "amendArgs";
/**
 * ClientWrapper is a specialized CRUD wrapper for client-side operations on a specific table. It extends the BaseClientCRUDWrapper and provides additional utility methods like `exists` to check if a record exists and `count` to count the number of records based on certain criteria. This class is designed to be flexible and can be extended further with more client-specific methods as needed.
 */
export declare class ClientWrapper<Table, TableFormData extends Partial<Table> = Partial<Table>, GetOptions extends GetTableOpts<Table> = GetTableOpts<Table>, UpdateOptions extends UpdateTableOpts<Table> = UpdateTableOpts<Table>> extends BaseClientCRUDWrapper<Table, TableFormData, GetOptions, UpdateOptions> {
    constructor(supabase: SupabaseClient, tableName: string, behaviour?: TableBehaviour);
    /**
     * @classmethod exists() Checks if a record with the specified ID exists in the table. It uses the `withLoading` method to manage loading state and accepts callbacks for additional control over the operation. The method returns a boolean indicating the existence of the record, wrapped in a Response object for consistent API responses.
     */
    exists(tableId: string, cbs?: Omit<Callbacks, ExistsFunctionOmitKeys>): Promise<Response<boolean>>;
    /**
     * @classmethod count() Counts the number of records in the table that match the specified criteria. It accepts optional filtering options and callbacks for managing loading state. The method constructs a query based on the provided options, executes it, and returns the count of matching records wrapped in a Response object. If an error occurs during the operation, it is handled gracefully and returned as an APIError response.
     */
    count(opts?: GetOptions, cbs?: Callbacks): Promise<Response<number>>;
}
export {};
