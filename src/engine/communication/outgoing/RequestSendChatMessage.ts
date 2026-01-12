import { OutgoingMessage } from "../protocol/OutgoingMessage";

export class RequestSendChatMessage extends OutgoingMessage {
    message: string;
    constructor(message: string) {
        super("chatMessage");
        this.message = message;
    }

    getPayload() {
        return { message: this.message };
    }
}
