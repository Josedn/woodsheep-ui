import { GameEngine } from "../../GameEngine";
import type { RoomInfo } from "../../LobbyService";
import type { IncomingEvent } from "../protocol/IncomingEvent";
import type { IncomingMessage } from "../protocol/IncomingMessage";

export class HandleRoomList implements IncomingEvent {
    handle(request: IncomingMessage): void {
        const roomList = request.payload as RoomInfo[];
        GameEngine.getGame().lobbyService.handleLobbyUpdate(roomList);
    }
    getRequestType(): string {
        return "roomList";
    }
}
