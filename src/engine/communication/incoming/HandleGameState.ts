import { GameEngine } from "../../GameEngine";
import type { GameStateData } from "../../GameService";
import type { IncomingEvent } from "../protocol/IncomingEvent";
import type { IncomingMessage } from "../protocol/IncomingMessage";

export class HandleGameState implements IncomingEvent {
    handle(request: IncomingMessage): void {
        const gameState = request.payload as GameStateData;
        GameEngine.getGame().gameService.handleGameState(gameState);
    }
    getRequestType(): string {
        return "gameState";
    }
}
