import {
  Flag,
  type Callbacks,
  type Response,
  TableBehaviour,
} from "../../../../types/index.js";
import { APIResponse } from "../../../response/index.js";
import { type SupabaseClient } from "@supabase/supabase-js";
import { APIError, ValidationError } from "../../../index.js";
import { UtilityMethods } from "./utility.js";

/**
 * @undertesting - Please note that BaseClientCRUDWrapper is currently under testing and may undergo significant changes. The current implementation serves as a foundational structure for CRUD operations, but we are actively working on refining the API, enhancing error handling, and optimizing performance. We recommend using this class for testing and prototyping purposes, but be prepared for potential breaking changes in future releases as we continue to improve and expand its capabilities.
 *
 * BaseClientCRUDWrapper is a foundational class that provides core CRUD functionalities for a specified bucket in Supabase. It includes methods for creating, reading, updating, and deleting records, as well as handling soft deletion if configured. The class also incorporates error handling and debugging capabilities to assist developers in identifying issues during development and production.
 */
export class BaseClientCRUDWrapper<
  Table,
  TableFormData,
  GetOptions,
  UpdateOptions
> extends UtilityMethods<TableFormData, GetOptions, UpdateOptions> {
  constructor(
    supabase: SupabaseClient,
    tableName: string,
    behaviour: TableBehaviour = {
      supportsSoftDeletion: true,
      softDeleteConfig: {
        flagKey: "is_deleted",
        timestampKey: "deleted_at",
      },
      debug: {
        returnHintsOnError: false,
      },
    }
  ) {
    super(supabase, tableName, behaviour);
  }
  /**
   * @method createOne() Creates a new record in the specified table with the provided data. It accepts optional callbacks for managing loading state and allows for falsy values in the payload if specified in the options. The method prepares the payload, executes the insert operation, and returns the created record wrapped in a Response object. If an error occurs during the operation, it is handled gracefully and returned as an APIError response.
   */
  async createOne(
    data: Partial<TableFormData> | TableFormData,
    cbs?: Callbacks,
    opts = { allowFalsy: false }
  ): Promise<Response<Table>> {
    return this.withLoading(cbs, async () => {
      try {
        const newPayload = this.preparePayload(data, cbs, opts.allowFalsy);

        const { data: apiData, error } = await this.supabase
          .from(this.tableName)
          .insert(newPayload)
          .select("*")
          .maybeSingle();

        if (error) {
          const hints = this.getDebugLogs({
            rawPayload: data,
            injectedPayload: newPayload,
            operation: "createOne",
            rawOutput: {
              data: apiData,
              error,
            },
          });
          throw new APIError(error.message, hints, error);
        }

        return new APIResponse(apiData || null, Flag.Success).build();
      } catch (error) {
        return this.handleError(error);
      }
    });
  }
  /**
   * @method createMany() Creates multiple records in the specified table with the provided array of data. The method executes a bulk insert operation and returns the created records wrapped in a Response object. If an error occurs during the operation, it is handled gracefully and returned as an APIError response.
   */
  async createMany(
    arr: Partial<TableFormData>[] | TableFormData[]
  ): Promise<Response<Table[]>> {
    return this.withLoading(undefined, async () => {
      try {
        const newPayloads = Array.isArray(arr) ? arr : [arr];
        const { data, error } = await this.supabase
          .from(this.tableName)
          .insert(newPayloads)
          .select("*");

        if (error) {
          const hints = this.getDebugLogs({
            rawPayload: arr,
            injectedPayload: newPayloads,
            operation: "createMany",
            rawOutput: {
              data,
              error,
            },
          });
          throw new APIError(error.message, hints, error);
        }

        return new APIResponse(data, Flag.Success).build();
      } catch (error) {
        return this.handleError(error);
      }
    });
  }
  /**
   * @method updateOneById() Updates a single record identified by its ID with the provided update data. It accepts optional callbacks for managing loading state and allows for falsy values in the update payload if specified in the options. The method prepares the payload, executes the update operation, and returns the updated record wrapped in a Response object. If an error occurs during the operation, it is handled gracefully and returned as an APIError response.
   */
  async updateOneById(
    tableId: string,
    update: Partial<TableFormData>,
    cbs?: Callbacks,
    opts: {
      allowFalsy: boolean;
    } = { allowFalsy: false }
  ): Promise<Response<Table>> {
    return this.withLoading(cbs, async () => {
      try {
        const newPayload = this.preparePayload(update, cbs, opts.allowFalsy);

        if (this.isEmptyPayload(newPayload)) {
          throw new ValidationError("No updates found.");
        }

        const { data, error } = await this.supabase
          .from(this.tableName)
          .update(newPayload)
          .eq("id", tableId)
          .select("*")
          .maybeSingle();

        if (error) {
          const hints = this.getDebugLogs({
            rawPayload: update,
            injectedPayload: newPayload,
            operation: "updateOneById",
            rawOutput: {
              data,
              error,
            },
          });
          throw new APIError(error.message, hints, error);
        }

        return new APIResponse(data || null, Flag.Success).build();
      } catch (error) {
        return this.handleError(error);
      }
    });
  }
  /**
   * @method getById() Retrieves a single record from the specified table by its ID. It accepts optional callbacks for managing loading state. The method executes a select operation and returns the retrieved record wrapped in a Response object. If an error occurs during the operation, it is handled gracefully and returned as an APIError response.
   */
  async getById(tableId: string, cbs?: Callbacks): Promise<Response<Table>> {
    return this.withLoading(cbs, async () => {
      try {
        const { data, error } = await this.supabase
          .from(this.tableName)
          .select("*")
          .eq("id", tableId)
          .maybeSingle();

        if (error) {
          const hints = this.getDebugLogs({
            tableId,
            operation: "getById",
            rawOutput: {
              data,
              error,
            },
          });
          throw new APIError(error.message, hints, error);
        }

        return new APIResponse(data || null, Flag.Success).build();
      } catch (error) {
        return this.handleError(error);
      }
    });
  }

  /**
   * @method batchUpdate() Updates multiple records that match the specified conditions with the provided update data. It accepts optional callbacks for managing loading state. The method prepares the payload, applies filters based on the conditions, executes the update operation, and returns the updated records wrapped in a Response object. If an error occurs during the operation, it is handled gracefully and returned as an APIError response.
   */

  async batchUpdate(
    update: Partial<TableFormData>,
    conditions: UpdateOptions,
    cbs?: Callbacks
  ): Promise<Response<Table[]>> {
    return this.withLoading(cbs, async () => {
      try {
        if (this.isEmptyPayload(update)) {
          throw new ValidationError("No updates found.");
        }

        const newPayload = cbs?.amendArgs?.({ formData: update }) || update;

        let query = this.supabase
          .from(this.tableName)
          .update(newPayload)
          .select("*");

        query = this.applyFilters(query, conditions);

        const { data, error } = await query;

        if (error) {
          const hints = this.getDebugLogs({
            rawPayload: update,
            injectedPayload: newPayload,
            operation: "batchUpdate",
            rawOutput: {
              data,
              error,
            },
          });
          throw new APIError(error.message, hints, error);
        }

        return new APIResponse(data, Flag.Success).build();
      } catch (error) {
        return this.handleError(error);
      }
    });
  }
  /**
   * @method get() Retrieves records from the specified table based on the provided options. It accepts optional callbacks for managing loading state. The method constructs a query based on the options, executes it, and returns the retrieved records along with pagination information wrapped in a Response object. If an error occurs during the operation, it is handled gracefully and returned as an APIError response.
   */
  async get(
    getOptions: GetOptions,
    cbs?: Callbacks
  ): Promise<Response<Table | Table[]>> {
    return this.withLoading(cbs, async () => {
      try {
        const {
          limit,
          single,
          maybeSingle,
          sortBy,
          sort,
          search,
          searchFields,
          page = 1,
          offset,
        } = getOptions as any;

        let query: any = this.supabase
          .from(this.tableName)
          .select("*", { count: "exact" });

        query = this.applyFilters(query, getOptions);

        if (
          typeof offset === "number" &&
          offset >= 0 &&
          typeof limit === "number"
        ) {
          query = query.range(offset, offset + limit - 1);
        } else if (
          typeof page === "number" &&
          page > 0 &&
          typeof limit === "number" &&
          limit > 0
        ) {
          const from = (page - 1) * limit;
          const to = from + limit - 1;

          query = query.range(from, to);
        }

        if (single && !maybeSingle) {
          query = query.single();
        }

        if (maybeSingle && !single) {
          query = query.maybeSingle();
        }

        if (sort) {
          query = query.order(sort, {
            ascending: sortBy === "asc",
          });
        }

        if (search?.trim()) {
          const trimmed = search.trim();

          const fields = searchFields?.length > 0 ? searchFields : [];

          const pattern = `%${trimmed}%`;

          const orFilters = fields
            .map((field: string) => `${field}.ilike.${pattern}`)
            .join(",");

          query = query.or(orFilters);
        }

        const { data, error, count } = await query;

        if (error) {
          const hints = this.getDebugLogs({
            providedOptions: getOptions,
            operation: "get",
            rawOutput: {
              data,
              error,
              count,
            },
          });
          throw new APIError(error.message, hints, error);
        }

        return new APIResponse(
          {
            data,
            pagination: {
              page,
              limit,
              total: count,
              totalPages: Math.ceil((count || 0) / limit),
            },
          },
          Flag.Success
        ).build();
      } catch (error) {
        return this.handleError(error);
      }
    });
  }
  /**
   * @method deleteOneByIDPermanent() Permanently deletes a single record identified by its ID from the specified table. It accepts optional callbacks for managing loading state. The method executes a delete operation and returns a success response if the deletion  is successful. If an error occurs during the operation, it is handled gracefully and returned as an APIError response.
   */
  async deleteOneByIDPermanent(
    tableId: string,
    cbs?: Callbacks
  ): Promise<Response<null>> {
    return this.withLoading(cbs, async () => {
      try {
        const { error } = await this.supabase
          .from(this.tableName)
          .delete()
          .eq("id", tableId);

        if (error) {
          const hints = this.getDebugLogs({
            tableId,
            operation: "deleteOneByIDPermanent",
            rawOutput: {
              error,
            },
          });
          throw new APIError(error.message, hints, error);
        }

        return new APIResponse(null, Flag.Success).build();
      } catch (error) {
        return this.handleError(error);
      }
    });
  }
  /**
   * @method toggleSoftDeleteOneById() Toggles the soft deletion state of a single record identified by its ID. It accepts an intent boolean to indicate whether to soft delete (true) or restore (false) the record, along with optional callbacks for managing loading state. The method checks if soft deletion is supported, prepares the update payload based on the configured soft delete keys, executes the update operation, and returns the updated record wrapped in a Response object. If an error occurs during the operation, it is handled gracefully and returned as an APIError response.
   */
  async toggleSoftDeleteOneById(
    tableId: string,
    intent: boolean,
    cbs?: Callbacks
  ) {
    return this.withLoading(cbs, async () => {
      try {
        if (!this.behaviour.supportsSoftDeletion) {
          throw new ValidationError(
            `Table '${this.tableName}' doesn't support soft deletion.` +
              "\n\n" +
              "You can configure this by passing the appropriate behaviour object to the respective instance."
          );
        }

        const { flagKey, timestampKey } = this.getSoftDeleteConfig();

        const updatePayload: Record<string, any> = {};

        if (flagKey) {
          updatePayload[flagKey] = intent;
        }

        if (timestampKey) {
          updatePayload[timestampKey] = intent
            ? new Date().toISOString()
            : null;
        }

        const { data, error } = await this.supabase
          .from(this.tableName)
          .update(updatePayload)
          .eq("id", tableId)
          .select("*")
          .maybeSingle();

        if (error) {
          const hints = this.getDebugLogs({
            tableId,
            shouldDelete: intent,
            configuredSoftDeleteKeys: this.behaviour.softDeleteConfig,
            operation: "toggleSoftDeleteOneById",
            rawOutput: {
              data,
              error,
            },
          });
          throw new APIError(error.message, hints, error);
        }

        return new APIResponse(data || null, Flag.Success).build();
      } catch (error) {
        return this.handleError(error);
      }
    });
  }
}
