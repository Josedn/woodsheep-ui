import { GameEngine } from "../../GameEngine";
import type { ShortRoomInfo } from "../../LobbyService";
import type { IncomingEvent } from "../protocol/IncomingEvent";
import type { IncomingMessage } from "../protocol/IncomingMessage";

export class HandleRoomList implements IncomingEvent {
    handle(request: IncomingMessage): void {
        const roomList = request.payload as ShortRoomInfo[];
        GameEngine.getGame().lobbyService.handleRoomList(roomList);
    }
    getRequestType(): string {
        return "roomList";
    }
}
