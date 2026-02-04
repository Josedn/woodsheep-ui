import { GameEngine } from "../../GameEngine";
import type { IncomingEvent } from "../protocol/IncomingEvent";
import type { IncomingMessage } from "../protocol/IncomingMessage";

type GameStateTile = {
    id: number;
    resource: string;
    number: number;
};
type GameStateData = {
    gameState: string;
    tiles: GameStateTile[];
};

export class HandleGameState implements IncomingEvent {
    handle(request: IncomingMessage): void {
        const gameState = request.payload as GameStateData;
        //GameEngine.getGame().lobbyService.addChatMessage(virtualId, message);
    }
    getRequestType(): string {
        return "gameState";
    }
}
