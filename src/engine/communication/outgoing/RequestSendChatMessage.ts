import { OutgoingMessage } from "../protocol/OutgoingMessage";

export class RequestSendChatMessage extends OutgoingMessage {
    message: string;
    constructor(message: string) {
        super("chat");
        this.message = message;
    }

    getBody() {
        return { message: this.message };
    }
}
