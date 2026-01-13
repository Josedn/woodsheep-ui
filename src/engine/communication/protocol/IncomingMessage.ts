export class IncomingMessage {
    requestType: string;
    payload: any;

    constructor(data: string) {
        const parsed = JSON.parse(data);
        this.requestType = parsed.requestType;
        this.payload = parsed.payload;
    }
}
