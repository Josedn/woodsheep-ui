import { GameEngine } from "./GameEngine";
import { createLogger } from "./misc/Logger";
import type { Intersection } from "./catan/Intersection";
import type { HexCoordinate } from "./catan/Tile";
import { RequestSendChatMessage } from "./communication/outgoing/RequestSendChatMessage";
import { UI_EVENTS } from "./ui-facade/UIFacade";
import { RequestRoomList } from "./communication/outgoing/RequestRoomList";
import { RequestCreateRoom } from "./communication/outgoing/RequestCreateRoom";
import { RequestJoinRoom } from "./communication/outgoing/RequestJoinRoom";
import { RequestStartGame } from "./communication/outgoing/RequestStartGame";

const logger = createLogger("LobbyService");

export class LobbyService {
    lobbies: ShortRoomInfo[] = [];
    chatMessages: ChatMessageReceived[] = [];
    roomInfo?: CurrentRoomInfo;
    roomUsers: { [id: number]: RoomUserData } = {};

    // Joining room and room info
    public requestLobbyInfo(roomId: string) {
        GameEngine.getGame().gameCommunicationService.send(new RequestJoinRoom(roomId));
    }

    public handleRoomInfo(roomInfo: CurrentRoomInfo) {
        this.roomInfo = roomInfo;
        GameEngine.getGame().uiFacade.emit("navigate", { page: `lobby/${roomInfo.roomId}` });
        GameEngine.getGame().uiFacade.emit(UI_EVENTS.UPDATE_LOBBY_INFO, { roomInfo });
    }

    public handleRoomRejected(reason: string) {
        GameEngine.getGame().uiFacade.emit("navigate", { page: `` });
        logger.debug("Room rejected", { reason });
    }

    public addUsersToRoom(roomUsers: RoomUserData[]) {
        roomUsers.forEach(roomUser => {
            this.roomUsers[roomUser.virtualId] = roomUser;
        });
        GameEngine.getGame().uiFacade.emit(UI_EVENTS.UPDATE_LOBBY_PLAYERS, { players: Object.values(this.roomUsers) });
    }

    public removeUserFromRoom(virtualId: number) {
        delete this.roomUsers[virtualId];
        GameEngine.getGame().uiFacade.emit(UI_EVENTS.UPDATE_LOBBY_PLAYERS, { players: Object.values(this.roomUsers) });
    }

    public requestStartGame() {
        GameEngine.getGame().gameCommunicationService.send(new RequestStartGame());
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
    color: string;
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

export type ChatMessageReceived = {
    content: string;
    sender: string;
};
