import { RealtimeChannel, SupabaseClient } from "@supabase/supabase-js";
import { RealtimeOptions, OnInsertCB, OnUpdateCB, OnDeleteCB, OnChangeCB, BaseRealtimeRow } from "../../../../types/index.js";
export declare class BaseRealtimeListener<T extends BaseRealtimeRow = BaseRealtimeRow> {
    protected readonly supabase: SupabaseClient;
    protected readonly tableName: string;
    constructor(supabase: SupabaseClient, tableName: string);
    private subscribe;
    onInsert(cb: OnInsertCB<T>, opts?: RealtimeOptions): RealtimeChannel;
    onUpdate(cb: OnUpdateCB<T>, opts?: RealtimeOptions): RealtimeChannel;
    onDelete(cb: OnDeleteCB<T>, opts?: RealtimeOptions): RealtimeChannel;
    onChange(cb: OnChangeCB<T>, opts?: RealtimeOptions): RealtimeChannel;
}
