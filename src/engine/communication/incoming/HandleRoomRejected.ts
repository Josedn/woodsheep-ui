import { GameEngine } from "../../GameEngine";
import type { IncomingEvent } from "../protocol/IncomingEvent";
import type { IncomingMessage } from "../protocol/IncomingMessage";

type RoomRejectedData = {
    reason: string;
};

export class HandleRoomRejected implements IncomingEvent {
    handle(request: IncomingMessage): void {
        const { reason } = request.payload as RoomRejectedData;
        GameEngine.getGame().lobbyService.handleRoomRejected(reason);
    }
    getRequestType(): string {
        return "roomRejected";
    }
}
