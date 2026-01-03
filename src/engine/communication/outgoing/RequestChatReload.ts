import { OutgoingMessage } from "../protocol/OutgoingMessage";

export class RequestChatReload extends OutgoingMessage {
    constructor() {
        super("chat");
    }

    getBody() {
        return { logs: true };
    }
}
