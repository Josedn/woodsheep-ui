import { GameEngine } from "../../GameEngine";
import type { IncomingEvent } from "../protocol/IncomingEvent";
import type { IncomingMessage } from "../protocol/IncomingMessage";

type RoomUserData = {
    virtualId: number;
    username: string;
};

export class HandleAddUserToRoomMessage implements IncomingEvent {
    handle(request: IncomingMessage): void {
        const roomUsers = request.payload as RoomUserData[];
    }
    getRequestType(): string {
        return "loginOk";
    }
}
