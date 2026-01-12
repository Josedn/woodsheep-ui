import { GameEngine } from "./GameEngine";
import { createLogger } from "./misc/Logger";
import type { Intersection } from "./catan/Intersection";
import type { HexCoordinate } from "./catan/Tile";
import { RequestSendChatMessage } from "./communication/outgoing/RequestSendChatMessage";
import { UI_EVENTS } from "./ui-facade/UIFacade";
import { RequestRoomList } from "./communication/outgoing/RequestRoomList";
import { RequestCreateRoom } from "./communication/outgoing/RequestCreateRoom";

const logger = createLogger("LobbyService");

export class LobbyService {
    lobbies: RoomInfo[];
    gameState?: GameState;
    chatMessages: ChatMessageReceived[];

    constructor() {
        this.lobbies = [];
        this.chatMessages = [];
    }

    public requestLobbyInfo() {}

    public pollLobbies() {
        GameEngine.getGame().gameCommunicationService.send(new RequestRoomList());
    }

    public stopPolling() {}

    public handleLobbyUpdate(rooms: RoomInfo[]) {
        this.lobbies = rooms;
        GameEngine.getGame().uiFacade.emit(UI_EVENTS.UPDATE_LOBBIES_LIST, { rooms });
    }

    public requestCreateRoom() {
        GameEngine.getGame().gameCommunicationService.send(new RequestCreateRoom());
    }

    public joinExistingRoom(roomId: string) {
        this.stopPolling();
        GameEngine.getGame().uiFacade.emit("navigate", { page: `lobby/${roomId}` });
    }

    public setGameState(gameState: GameState) {
        this.gameState = gameState;
        GameEngine.getGame().uiFacade.emit("updateGameState", { gameState });
    }

    public addChatMessage(senderVirtualId: number, message: string) {
        this.chatMessages.push({ sender: "", content: message });
        GameEngine.getGame().uiFacade.emit("updateChatMessages", { chatMessages: this.chatMessages });
    }

    public sendChatMessage(message: string) {
        GameEngine.getGame().gameCommunicationService.send(new RequestSendChatMessage(message));
    }
}

export type ConnectedUser = {
    userName: string;
    id: number;
};

export type RoomInfo = {
    roomId: string;
    name: string;
    maxPlayers: number;
    currentPlayers: number;
};

export type BoardGamePlayer = {
    name: string;
    id: number;
    color: string;
    numSettlements: boolean;
    numCities: boolean;
    numPlayedKnights: number;
    numRoads: boolean;
    longestRoad: boolean;
    largestArmy: boolean;
    victoryPoints: number;
    numResourceCards: number;
    numDevelopmentCards: number;
    rates: {
        ore: number;
        wheat: number;
        brick: number;
        sheep: number;
        wildcard: number;
        wood: number;
    };
};

export type BoardTile = {
    hexCoordinate: HexCoordinate;
    type: "WHEAT";
    hasRobber: boolean;
    number: number;
    portLocations: Intersection[];
};
export type BoardIntersection = {
    coordinate: Intersection;
    canBuildSettlement: boolean;
};
export type BoardPath = {
    start: Intersection;
    end: Intersection;
    canBuildRoad: boolean;
};

export type GameState = {
    playerID: number;
    resources: {
        ore: number;
        wheat: number;
        brick: number;
        sheep: number;
        wildcard: number;
        wood: number;
    };
    devCards: {
        Knight: number;
        "Road Building": number;
        "Year of Plenty": number;
        "Victory Point": number;
        Monopoly: number;
    };
    canBuildRoad: boolean;
    canBuildSettlement: boolean;
    canBuildCity: boolean;
    canBuyDevCard: boolean;
    currentTurn: number;
    board: {
        tiles: BoardTile[];
        intersections: BoardIntersection[];
        paths: BoardPath[];
    };
    players: BoardGamePlayer[];
    settings: {
        numPlayers: number;
        winningPointCount: number;
        COLORS: string[];
        isDecimal: boolean;
        isDynamic: boolean;
        isStandard: boolean;
    };
    stats: {
        rolls: number[];
        turn: number;
    };
    turnOrder?: number[];
    followUp?: {
        actionName: string;
        actionData: {
            message: string;
        };
    };
};

export type ChatMessageReceived = {
    content: string;
    sender: string;
};
