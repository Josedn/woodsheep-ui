import { GameEngine } from "./GameEngine";
import { createLogger } from "./misc/Logger";
import { RequestEndTurn } from "./communication/outgoing/RequestEndTurn";
import { RequestRollDice } from "./communication/outgoing/RequestRollDice";
import { UI_EVENTS } from "./ui-facade/UIFacade";

const logger = createLogger("GameService");

export class GameService {
    gameStateData: GameStateData;

    constructor() {
        this.gameStateData = {
            gameState: "WAITING",
            tiles: [],
            currentColor: null,
            currentTurnColor: null,
            currentPrompt: null,
            diceRoll: null,
            players: [],
            yourColor: null,
            yourHand: null,
            playableActionTypes: [],
            bankResources: {},
            bankDevCardCount: 0,
        };
    }

    public handleGameState(gameStateData: GameStateData) {
        this.gameStateData = gameStateData;
        GameEngine.getGame().uiFacade.emit(UI_EVENTS.GAME_STATE_UPDATED, gameStateData);
    }

    public requestRoll() {
        GameEngine.getGame().gameCommunicationService.send(new RequestRollDice());
    }

    public requestEndTurn() {
        GameEngine.getGame().gameCommunicationService.send(new RequestEndTurn());
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

export type GameStatePlayer = {
    color: string;
    username: string;
    isBot: boolean;
    visibleVictoryPoints: number;
    realVictoryPoints: number;
    resourceCount: number;
    devCardCount: number;
    armyCount: number;
    roadLength: number;
    hasLongestRoad: boolean;
    hasLargestArmy: boolean;
};

export type GameStateData = {
    gameState: string;
    tiles: GameStateTile[];
    currentColor: string | null;
    currentTurnColor: string | null;
    currentPrompt: string | null;
    diceRoll: [number, number] | null;
    players: GameStatePlayer[];
    yourColor: string | null;
    yourHand: Record<string, number> | null;
    playableActionTypes: string[];
    bankResources: Record<string, number>;
    bankDevCardCount: number;
};
