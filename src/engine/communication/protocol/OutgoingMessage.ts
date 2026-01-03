export class OutgoingMessage {
    requestType: string;

    constructor(requestType: string) {
        this.requestType = requestType;
    }

    public getBody(): object {
        return {};
    }

    public stringify(): string {
        const merged = { requestType: this.requestType, ...this.getBody() };
        return JSON.stringify(merged);
    }
}
