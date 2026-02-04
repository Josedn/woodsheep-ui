import { OutgoingMessage } from "../protocol/OutgoingMessage";

export class RequestStartGame extends OutgoingMessage {
    constructor() {
        super("roomStartGame");
    }
}
