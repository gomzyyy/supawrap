export class BroadcastWrapper {
    supabase;
    channelName;
    constructor(supabase, channelName) {
        this.supabase = supabase;
        this.channelName = channelName;
    }
    getChannel() {
        return this.supabase.channel(this.channelName);
    }
    subscribe() {
        return this.getChannel().subscribe();
    }
    async send(event, payload) {
        await this.getChannel().send({
            type: "broadcast",
            event,
            payload,
        });
    }
    on(event, cb) {
        return this.getChannel()
            .on("broadcast", { event }, (payload) => cb(payload.payload))
            .subscribe();
    }
}
