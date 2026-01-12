export class IncomingMessage {
    requestType: string;
    body: any;

    constructor(data: string) {
        const parsed = JSON.parse(data);
        this.requestType = parsed.requestType;
        this.body = parsed.body;
    }
}
