import { OutgoingMessage } from "../protocol/OutgoingMessage";

export class RequestCreateRoom extends OutgoingMessage {
    constructor() {
        super("createRoom");
    }
}
