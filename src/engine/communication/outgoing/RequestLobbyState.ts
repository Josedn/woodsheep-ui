import { OutgoingMessage } from "../protocol/OutgoingMessage";

export class RequestLobbyState extends OutgoingMessage {
    constructor() {
        super("getGameState");
    }
}
