export interface CommonSchema {
    id: string;
    created_at: string;
    updated_at?: string;
}
export interface CRUDOptions<Table> {
    eq?: {
        key: keyof Table;
        value: Table[keyof Table];
    }[];
    sort?: keyof Table;
    sortBy?: "asc" | "dec";
    limit?: number;
    single?: boolean;
    maybeSingle?: boolean;
    or?: string;
    contains?: {
        key: keyof Table;
        value: Table[keyof Table];
    }[];
    overlaps?: {
        key: keyof Table;
        value: Table[keyof Table][];
    }[];
    ilike?: {
        key: keyof Table;
        value: string;
    }[];
    inValue?: {
        key: keyof Table;
        value: Table[keyof Table][];
    };
    search?: string;
    searchFields?: keyof Table[];
    page?: number;
    offset?: number;
}
type OmittedUpdateTableOpts = "limit" | "single" | "maybeSingle" | "sort" | "sortBy" | "search" | "searchFields" | "page" | "offset";
export interface UpdateTableOpts<Table> extends Omit<CRUDOptions<Table>, OmittedUpdateTableOpts> {
}
export interface GetTableOpts<Table> extends CRUDOptions<Table> {
}
export {};
