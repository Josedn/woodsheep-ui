import { OutgoingMessage } from "../protocol/OutgoingMessage";

export class RequestJoinRoom extends OutgoingMessage {
    roomId: string;
    constructor(roomId: string) {
        super("joinRoom");
        this.roomId = roomId;
    }

    getPayload() {
        return { roomId: this.roomId };
    }
}
