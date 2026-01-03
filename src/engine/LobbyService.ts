import { RequestChatReload } from "./communication/outgoing/RequestChatReload";
import { RequestLobbyState } from "./communication/outgoing/RequestLobbyState";
import { GameEngine } from "./GameEngine";
import { deleteCookie, setCookie } from "./misc/CookieUtils";
import { createLogger } from "./misc/Logger";
import type { Intersection } from "./catan/Intersection";
import type { HexCoordinate } from "./catan/Tile";
import { RequestSendChatMessage } from "./communication/outgoing/RequestSendChatMessage";

const logger = createLogger("LobbyService");

export class LobbyService {
    lobbies: GroupInfo[];
    // TODO: review limit
    atLimit: boolean;
    gameState?: GameState;
    chatMessages: ChatMessageReceived[];

    constructor() {
        this.lobbies = [];
        this.atLimit = false;
        this.chatMessages = [];
    }

    public resetEverythingAndGoHome() {
        deleteCookie("USER_ID");
        deleteCookie("desiredGroupId");
        deleteCookie("groupName");
        deleteCookie("numPlayersDesired");
        GameEngine.getGame().uiFacade.emit("navigate", { page: `home` });
        const { gameCommunicationService } = GameEngine.getGame();
        gameCommunicationService.disconnect();
    }

    public async requestLobbyInfo() {
        const { gameCommunicationService } = GameEngine.getGame();
        try {
            await gameCommunicationService.connect();
            gameCommunicationService.send(new RequestLobbyState());
            gameCommunicationService.send(new RequestChatReload());
        } catch (error) {
            logger.warn("Can't connect ws :", { error });
        }
    }

    public async pollLobbies() {
        try {
            await GameEngine.getGame().groupCommunicationService.connect();
        } catch (error) {
            logger.warn("Can't connect ws :", { error });
        }
    }

    public stopPolling() {
        GameEngine.getGame().groupCommunicationService.disconnect();
    }

    public handleLobbyUpdate(groups: GroupInfo[], atLimit: boolean) {
        this.lobbies = groups;
        this.atLimit = atLimit;

        GameEngine.getGame().uiFacade.emit("updateLobbies", { groups, atLimit });
    }

    public joinExistingGame(groupId: string) {
        const userName = GameEngine.getGame().profileService.currentUser.userName;
        const groupSize = 4;
        const victoryPoints = 10;
        const isDecimal = false;
        const isDynamic = false;
        const isStandard = false;

        setCookie("desiredGroupId", groupId);
        setCookie("userName", userName);
        setCookie("numPlayersDesired", groupSize.toString());
        setCookie("victoryPoints", victoryPoints.toString());
        setCookie("isDecimal", isDecimal.toString());
        setCookie("isDynamic", isDynamic.toString());
        setCookie("isStandard", isStandard.toString());
        deleteCookie("USER_ID");

        this.stopPolling();

        GameEngine.getGame().uiFacade.emit("navigate", { page: `lobby/${groupId}` });
    }

    public setGameState(gameState: GameState) {
        this.gameState = gameState;
        GameEngine.getGame().uiFacade.emit("updateGameState", { gameState });
    }

    public addChatMessage(chatMessage: ChatMessageReceived) {
        this.chatMessages.push(chatMessage);
        GameEngine.getGame().uiFacade.emit("updateChatMessages", { chatMessages: this.chatMessages });
    }

    public setChatMessages(chatMessages: ChatMessageReceived[]) {
        this.chatMessages = chatMessages;
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
export type GroupInfo = {
    group: {
        id: string;
        maxSize: number;
        currentSize: number;
        groupName: string;
        connectedUsers: ConnectedUser[];
    };
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
    timestamp: number;
    userId: number;
};
