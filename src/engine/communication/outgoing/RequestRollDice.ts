import { OutgoingMessage } from "../protocol/OutgoingMessage";

export class RequestRollDice extends OutgoingMessage {
    constructor() {
        super("rollDice");
    }
}
