import { type Callbacks, type Response, TableBehaviour } from "../../../../types/index.js";
import { type SupabaseClient } from "@supabase/supabase-js";
import { UtilityMethods } from "./utility.js";
/**
 * @undertesting - Please note that BaseClientCRUDWrapper is currently under testing and may undergo significant changes. The current implementation serves as a foundational structure for CRUD operations, but we are actively working on refining the API, enhancing error handling, and optimizing performance. We recommend using this class for testing and prototyping purposes, but be prepared for potential breaking changes in future releases as we continue to improve and expand its capabilities.
 *
 * BaseClientCRUDWrapper is a foundational class that provides core CRUD functionalities for a specified bucket in Supabase. It includes methods for creating, reading, updating, and deleting records, as well as handling soft deletion if configured. The class also incorporates error handling and debugging capabilities to assist developers in identifying issues during development and production.
 */
export declare class BaseClientCRUDWrapper<Table, TableFormData, GetOptions, UpdateOptions> extends UtilityMethods<TableFormData, GetOptions, UpdateOptions> {
    constructor(supabase: SupabaseClient, tableName: string, behaviour?: TableBehaviour);
    /**
     * @method createOne() Creates a new record in the specified table with the provided data. It accepts optional callbacks for managing loading state and allows for falsy values in the payload if specified in the options. The method prepares the payload, executes the insert operation, and returns the created record wrapped in a Response object. If an error occurs during the operation, it is handled gracefully and returned as an APIError response.
     */
    createOne(data: Partial<TableFormData> | TableFormData, cbs?: Callbacks, opts?: {
        allowFalsy: boolean;
    }): Promise<Response<Table>>;
    /**
     * @method createMany() Creates multiple records in the specified table with the provided array of data. The method executes a bulk insert operation and returns the created records wrapped in a Response object. If an error occurs during the operation, it is handled gracefully and returned as an APIError response.
     */
    createMany(arr: Partial<TableFormData>[] | TableFormData[]): Promise<Response<Table[]>>;
    /**
     * @method updateOneById() Updates a single record identified by its ID with the provided update data. It accepts optional callbacks for managing loading state and allows for falsy values in the update payload if specified in the options. The method prepares the payload, executes the update operation, and returns the updated record wrapped in a Response object. If an error occurs during the operation, it is handled gracefully and returned as an APIError response.
     */
    updateOneById(tableId: string, update: Partial<TableFormData>, cbs?: Callbacks, opts?: {
        allowFalsy: boolean;
    }): Promise<Response<Table>>;
    /**
     * @method getById() Retrieves a single record from the specified table by its ID. It accepts optional callbacks for managing loading state. The method executes a select operation and returns the retrieved record wrapped in a Response object. If an error occurs during the operation, it is handled gracefully and returned as an APIError response.
     */
    getById(tableId: string, cbs?: Callbacks): Promise<Response<Table>>;
    /**
     * @method batchUpdate() Updates multiple records that match the specified conditions with the provided update data. It accepts optional callbacks for managing loading state. The method prepares the payload, applies filters based on the conditions, executes the update operation, and returns the updated records wrapped in a Response object. If an error occurs during the operation, it is handled gracefully and returned as an APIError response.
     */
    batchUpdate(update: Partial<TableFormData>, conditions: UpdateOptions, cbs?: Callbacks): Promise<Response<Table[]>>;
    /**
     * @method get() Retrieves records from the specified table based on the provided options. It accepts optional callbacks for managing loading state. The method constructs a query based on the options, executes it, and returns the retrieved records along with pagination information wrapped in a Response object. If an error occurs during the operation, it is handled gracefully and returned as an APIError response.
     */
    get(getOptions: GetOptions, cbs?: Callbacks): Promise<Response<Table | Table[]>>;
    /**
     * @method deleteOneByIDPermanent() Permanently deletes a single record identified by its ID from the specified table. It accepts optional callbacks for managing loading state. The method executes a delete operation and returns a success response if the deletion  is successful. If an error occurs during the operation, it is handled gracefully and returned as an APIError response.
     */
    deleteOneByIDPermanent(tableId: string, cbs?: Callbacks): Promise<Response<null>>;
    /**
     * @method toggleSoftDeleteOneById() Toggles the soft deletion state of a single record identified by its ID. It accepts an intent boolean to indicate whether to soft delete (true) or restore (false) the record, along with optional callbacks for managing loading state. The method checks if soft deletion is supported, prepares the update payload based on the configured soft delete keys, executes the update operation, and returns the updated record wrapped in a Response object. If an error occurs during the operation, it is handled gracefully and returned as an APIError response.
     */
    toggleSoftDeleteOneById(tableId: string, intent: boolean, cbs?: Callbacks): Promise<Response<any, unknown>>;
}
