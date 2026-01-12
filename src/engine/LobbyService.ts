import { GameEngine } from "./GameEngine";
import { createLogger } from "./misc/Logger";
import type { Intersection } from "./catan/Intersection";
import type { HexCoordinate } from "./catan/Tile";
import { RequestSendChatMessage } from "./communication/outgoing/RequestSendChatMessage";
import { UI_EVENTS } from "./ui-facade/UIFacade";
import { RequestRoomList } from "./communication/outgoing/RequestRoomList";
import { RequestCreateRoom } from "./communication/outgoing/RequestCreateRoom";
import { RequestJoinRoom } from "./communication/outgoing/RequestJoinRoom";

const logger = createLogger("LobbyService");

export class LobbyService {
    lobbies: ShortRoomInfo[] = [];
    gameState?: GameState;
    chatMessages: ChatMessageReceived[] = [];
    roomInfo?: CurrentRoomInfo;
    roomUsers: { [id: string]: RoomUserData } = {};

    // Joining room and room info
    public requestLobbyInfo(roomId: string) {
        GameEngine.getGame().gameCommunicationService.send(new RequestJoinRoom(roomId));
    }

    public handleRoomInfo(roomInfo: CurrentRoomInfo) {
        this.roomInfo = roomInfo;
        GameEngine.getGame().uiFacade.emit("navigate", { page: `lobby/${roomInfo.roomId}` });
        GameEngine.getGame().uiFacade.emit(UI_EVENTS.UPDATE_LOBBY_INFO, { roomInfo });
    }

    public addUsersToRoom(roomUsers: RoomUserData[]) {
        roomUsers.forEach(roomUser => {
            this.roomUsers[roomUser.virtualId] = roomUser;
        });
        GameEngine.getGame().uiFacade.emit(UI_EVENTS.UPDATE_LOBBY_PLAYERS, { players: Object.values(this.roomUsers) });
    }

    // Messenger
    public addChatMessage(senderVirtualId: number, message: string) {
        const senderRoomUser = this.roomUsers[senderVirtualId];
        if (senderRoomUser != null) {
            this.chatMessages.push({ sender: senderRoomUser.username, content: message });
            GameEngine.getGame().uiFacade.emit("updateChatMessages", { chatMessages: this.chatMessages });
        }
    }

    public sendChatMessage(message: string) {
        GameEngine.getGame().gameCommunicationService.send(new RequestSendChatMessage(message));
    }

    // Home page
    public pollLobbies() {
        GameEngine.getGame().gameCommunicationService.send(new RequestRoomList());
    }

    public handleRoomList(rooms: ShortRoomInfo[]) {
        this.lobbies = rooms;
        GameEngine.getGame().uiFacade.emit(UI_EVENTS.UPDATE_LOBBIES_LIST, { rooms });
    }

    public requestCreateRoom() {
        GameEngine.getGame().gameCommunicationService.send(new RequestCreateRoom());
    }
    // End home page
}

export type RoomUserData = {
    virtualId: number;
    username: string;
};

export type ShortRoomInfo = {
    roomId: string;
    name: string;
    maxPlayers: number;
    currentPlayers: number;
};

export type CurrentRoomInfo = {
    roomId: string;
    map: string;
    hideBankCards: boolean;
    privateGame: boolean;
    maxPlayers: number;
    turnTimer: number;
    cardDiscardLimit: number;
    pointsToWin: number;
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
