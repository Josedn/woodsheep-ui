import { GameEngine } from "../../GameEngine";
import type { IncomingEvent } from "../protocol/IncomingEvent";
import type { IncomingMessage } from "../protocol/IncomingMessage";

type PrepareRoomData = {
    roomId: string;
};

export class HandlePrepareRoom implements IncomingEvent {
    handle(request: IncomingMessage): void {
        const { roomId } = request.payload as PrepareRoomData;
        GameEngine.getGame().lobbyService.joinExistingRoom(roomId);
    }
    getRequestType(): string {
        return "prepareRoom";
    }
}
