import { OutgoingMessage } from "../protocol/OutgoingMessage";

export class RequestHandshake extends OutgoingMessage {
    sso: string;
    constructor(sso: string) {
        super("login");
        this.sso = sso;
    }

    getPayload() {
        return { sso: this.sso };
    }
}
