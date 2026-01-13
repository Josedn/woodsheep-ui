import { OutgoingMessage } from "../protocol/OutgoingMessage";

export class RequestRoomList extends OutgoingMessage {
    constructor() {
        super("roomList");
    }
}
