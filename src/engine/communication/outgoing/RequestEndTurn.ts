import { OutgoingMessage } from "../protocol/OutgoingMessage";

export class RequestEndTurn extends OutgoingMessage {
    constructor() {
        super("endTurn");
    }
}
