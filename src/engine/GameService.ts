import { GameEngine } from "./GameEngine";
import { createLogger } from "./misc/Logger";
import { UI_EVENTS } from "./ui-facade/UIFacade";

const logger = createLogger("GameService");

export class GameService {
    gameStateData: GameStateData;

    constructor() {
        this.gameStateData = {
            gameState: "WAITING",
            tiles: [],
        };
    }

    public handleGameState(gameStateData: GameStateData) {
        this.gameStateData = gameStateData;
        GameEngine.getGame().uiFacade.emit(UI_EVENTS.GAME_STATE_UPDATED, { gameState: gameStateData.gameState, tiles: gameStateData.tiles });
    }
}

export type GameStateTile = {
    id: number;
    resource: string;
    number: number;
    q: number;
    r: number;
    s: number;
};

export type GameStateData = {
    gameState: string;
    tiles: GameStateTile[];
};
