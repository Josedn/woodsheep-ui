import { GameEngine } from "./GameEngine";
import { createLogger } from "./misc/Logger";
import { RequestBuildCity } from "./communication/outgoing/RequestBuildCity";
import { RequestBuildRoad } from "./communication/outgoing/RequestBuildRoad";
import { RequestBuildSettlement } from "./communication/outgoing/RequestBuildSettlement";
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
            ports: [],
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
            buildings: [],
            roads: [],
            buildableSettlementNodeIds: [],
            buildableCityNodeIds: [],
            buildableRoadEdges: [],
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

    public requestBuildSettlement(nodeId: number) {
        GameEngine.getGame().gameCommunicationService.send(new RequestBuildSettlement(nodeId));
    }

    public requestBuildCity(nodeId: number) {
        GameEngine.getGame().gameCommunicationService.send(new RequestBuildCity(nodeId));
    }

    public requestBuildRoad(nodeA: number, nodeB: number) {
        GameEngine.getGame().gameCommunicationService.send(new RequestBuildRoad(nodeA, nodeB));
    }
}

export type GameStateTile = {
    id: number;
    resource: string;
    number: number;
    q: number;
    r: number;
    s: number;
    nodes: Record<string, number>;
};

export type GameStatePort = {
    id: number;
    resource: string | null;
    direction: string;
    nodeA: number;
    nodeB: number;
    q: number;
    r: number;
    s: number;
};

export type GameStateBuilding = {
    nodeId: number;
    color: string;
    type: string;
};

export type GameStateRoad = {
    nodeA: number;
    nodeB: number;
    color: string;
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
    ports: GameStatePort[];
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
    buildings: GameStateBuilding[];
    roads: GameStateRoad[];
    buildableSettlementNodeIds: number[];
    buildableCityNodeIds: number[];
    buildableRoadEdges: GameStateRoadEdgeCandidate[];
};

export type GameStateRoadEdgeCandidate = {
    nodeA: number;
    nodeB: number;
};
