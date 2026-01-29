import { GameEngine } from "../../GameEngine";
import type { IncomingEvent } from "../protocol/IncomingEvent";
import type { IncomingMessage } from "../protocol/IncomingMessage";

type GameStateData = {
    gameState: string;
};

export class HandleGameState implements IncomingEvent {
    handle(request: IncomingMessage): void {
        //const { } = request.payload as GameStateData;
        //GameEngine.getGame().lobbyService.addChatMessage(virtualId, message);
    }
    getRequestType(): string {
        return "gameState";
    }
}
