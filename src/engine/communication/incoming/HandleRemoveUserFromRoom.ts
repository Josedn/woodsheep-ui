import { GameEngine } from "../../GameEngine";
import type { IncomingEvent } from "../protocol/IncomingEvent";
import type { IncomingMessage } from "../protocol/IncomingMessage";

type RemoveUserFromRoomData = {
    virtualId: number;
};

export class HandleRemoveUserFromRoom implements IncomingEvent {
    handle(request: IncomingMessage): void {
        const { virtualId } = request.payload as RemoveUserFromRoomData;
        GameEngine.getGame().lobbyService.removeUserFromRoom(virtualId);
    }
    getRequestType(): string {
        return "removeUserFromRoom";
    }
}
