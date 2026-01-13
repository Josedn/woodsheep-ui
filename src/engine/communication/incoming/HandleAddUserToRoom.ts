import { GameEngine } from "../../GameEngine";
import type { RoomUserData } from "../../LobbyService";
import type { IncomingEvent } from "../protocol/IncomingEvent";
import type { IncomingMessage } from "../protocol/IncomingMessage";

export class HandleAddUserToRoomMessage implements IncomingEvent {
    handle(request: IncomingMessage): void {
        const roomUsers = request.payload as RoomUserData[];
        GameEngine.getGame().lobbyService.addUsersToRoom(roomUsers);
    }
    getRequestType(): string {
        return "addUserToRoom";
    }
}
