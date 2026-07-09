import { GameEngine } from "./GameEngine";
import { createLogger } from "./misc/Logger";

const logger = createLogger("GameService");

export class GameService {
    gameStateData: GameStateData;

    constructor() {
        this.gameStateData = {
            gameState: "WAITING",
            tiles: [],
        }
    }

    public handleGameState(gameStateData: GameStateData) {
        this.gameStateData = gameStateData;
        if (this.gameStateData.gameState === "IN_GAME") {
            GameEngine.getGame().uiFacade.emit("navigate", { page: `game/missing-id` });
        }
    }
}

export type GameStateTile = {
    id: number;
    resource: string;
    number: number;
};

export type GameStateData = {
    gameState: string;
    tiles: GameStateTile[];
};