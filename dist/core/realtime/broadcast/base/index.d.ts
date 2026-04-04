import { RealtimeChannel, SupabaseClient } from "@supabase/supabase-js";
export declare class BroadcastWrapper {
    protected readonly supabase: SupabaseClient;
    protected readonly channelName: string;
    constructor(supabase: SupabaseClient, channelName: string);
    private getChannel;
    subscribe(): RealtimeChannel;
    send<T>(event: string, payload: T): Promise<void>;
    on<T>(event: string, cb: (payload: T) => void): RealtimeChannel;
}
