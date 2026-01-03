import { GameEngine } from "../../GameEngine";
import type { GameState } from "../../LobbyService";
import type { IncomingEvent } from "../protocol/IncomingEvent";
import type { IncomingMessage } from "../protocol/IncomingMessage";

export class HandleGameState implements IncomingEvent {
    handle(request: IncomingMessage): void {
        const data = request.body as GameState;
        GameEngine.getGame().lobbyService.setGameState(data);
    }
    public static getRequestType(): string {
        return "getGameState";
    }
}
