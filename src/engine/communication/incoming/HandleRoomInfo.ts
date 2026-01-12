import { GameEngine } from "../../GameEngine";
import type { CurrentRoomInfo } from "../../LobbyService";
import type { IncomingEvent } from "../protocol/IncomingEvent";
import type { IncomingMessage } from "../protocol/IncomingMessage";

export class HandleRoomInfo implements IncomingEvent {
    handle(request: IncomingMessage): void {
        GameEngine.getGame().lobbyService.handleRoomInfo(request.payload as CurrentRoomInfo);
    }
    getRequestType(): string {
        return "prepareRoom";
    }
}
