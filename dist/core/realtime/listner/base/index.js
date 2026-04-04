export class BaseRealtimeListener {
    supabase;
    tableName;
    constructor(supabase, tableName) {
        this.supabase = supabase;
        this.tableName = tableName;
    }
    subscribe(event, cb, opts = {}) {
        const { filter, id = this.tableName } = opts;
        return this.supabase
            .channel(`realtime-${id}-${event.toLowerCase()}`)
            .on("postgres_changes", {
            event,
            schema: "public",
            table: this.tableName,
            filter,
        }, (payload) => cb(payload))
            .subscribe();
    }
    onInsert(cb, opts) {
        return this.subscribe("INSERT", cb, opts);
    }
    onUpdate(cb, opts) {
        return this.subscribe("UPDATE", cb, opts);
    }
    onDelete(cb, opts) {
        return this.subscribe("DELETE", cb, opts);
    }
    onChange(cb, opts) {
        return this.subscribe("*", cb, opts);
    }
}
