import {
  RealtimeChannel,
  SupabaseClient,
} from "@supabase/supabase-js";

export class BroadcastWrapper {
  constructor(
    protected readonly supabase: SupabaseClient,
    protected readonly channelName: string
  ) {}

  private getChannel(): RealtimeChannel {
    return this.supabase.channel(
      this.channelName
    );
  }

  subscribe(): RealtimeChannel {
    return this.getChannel().subscribe();
  }

  async send<T>(
    event: string,
    payload: T
  ): Promise<void> {
    await this.getChannel().send({
      type: "broadcast",
      event,
      payload,
    });
  }

  on<T>(
    event: string,
    cb: (payload: T) => void
  ): RealtimeChannel {
    return this.getChannel()
      .on(
        "broadcast",
        { event },
        (payload) => cb(payload.payload as T)
      )
      .subscribe();
  }
}