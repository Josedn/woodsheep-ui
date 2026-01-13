export class OutgoingMessage {
    requestType: string;

    constructor(requestType: string) {
        this.requestType = requestType;
    }

    public getPayload(): object {
        return {};
    }

    public stringify(): string {
        const merged = { requestType: this.requestType, payload: this.getPayload() };
        return JSON.stringify(merged);
    }
}
