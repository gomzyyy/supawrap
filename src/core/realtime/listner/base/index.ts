import { RealtimeChannel, SupabaseClient } from "@supabase/supabase-js";

import {
  RealtimeOptions,
  BaseRealtimeCBFunction,
  RealtimeEventType,
  OnInsertCB,
  OnUpdateCB,
  OnDeleteCB,
  OnChangeCB,
  BaseRealtimeRow,
} from "../../../../types/index.js";

export class BaseRealtimeListener<T extends BaseRealtimeRow = BaseRealtimeRow> {
  constructor(
    protected readonly supabase: SupabaseClient,
    protected readonly tableName: string
  ) {}

  private subscribe<E extends RealtimeEventType>(
    event: E,
    cb: BaseRealtimeCBFunction<T, E>,
    opts: RealtimeOptions = {}
  ): RealtimeChannel {
    const { filter, id = this.tableName } = opts;

    return this.supabase
      .channel(`realtime-${id}-${event.toLowerCase()}`)
      .on(
        "postgres_changes",
        {
          event,
          schema: "public",
          table: this.tableName,
          filter,
        },
        (payload) => cb(payload as any)
      )
      .subscribe();
  }

  onInsert(cb: OnInsertCB<T>, opts?: RealtimeOptions): RealtimeChannel {
    return this.subscribe("INSERT", cb, opts);
  }

  onUpdate(cb: OnUpdateCB<T>, opts?: RealtimeOptions): RealtimeChannel {
    return this.subscribe("UPDATE", cb, opts);
  }

  onDelete(cb: OnDeleteCB<T>, opts?: RealtimeOptions): RealtimeChannel {
    return this.subscribe("DELETE", cb, opts);
  }

  onChange(cb: OnChangeCB<T>, opts?: RealtimeOptions): RealtimeChannel {
    return this.subscribe("*", cb, opts);
  }
}
