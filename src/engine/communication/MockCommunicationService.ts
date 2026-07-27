import type { CurrentRoomInfo, RoomUserData, ShortRoomInfo } from "../LobbyService";
import { createLogger } from "../misc/Logger";
import { HandleAddUserToRoomMessage } from "./incoming/HandleAddUserToRoom";
import { HandleChatMessage } from "./incoming/HandleChatMessage";
import { HandleGameState } from "./incoming/HandleGameState";
import { HandleLoginOk } from "./incoming/HandleLoginOk";
import { HandleRemoveUserFromRoom } from "./incoming/HandleRemoveUserFromRoom";
import { HandleRoomInfo } from "./incoming/HandleRoomInfo";
import { HandleRoomList } from "./incoming/HandleRoomList";
import { HandleRoomRejected } from "./incoming/HandleRoomRejected";
import type { ICommunicationService } from "./ICommunicationService";
import type { IncomingEvent } from "./protocol/IncomingEvent";
import type { OutgoingMessage } from "./protocol/OutgoingMessage";

const logger = createLogger("MockCommunicationService");

const MOCK_USER = { userId: "mock-user-1", username: "MockPlayer" };

const MOCK_ROOMS: ShortRoomInfo[] = [
    { roomId: "room-1", name: "Mock Room Alpha", maxPlayers: 4, currentPlayers: 1 },
    { roomId: "room-2", name: "Mock Room Beta", maxPlayers: 3, currentPlayers: 2 },
];

const MOCK_ROOM_INFO: CurrentRoomInfo = {
    roomId: "room-1",
    map: "standard",
    hideBankCards: false,
    privateGame: false,
    maxPlayers: 4,
    turnTimer: 60,
    cardDiscardLimit: 7,
    pointsToWin: 10,
};

const MOCK_ROOM_USERS: RoomUserData[] = [
    { virtualId: 1, username: "MockPlayer", color: "red" },
    { virtualId: 2, username: "BotAlpha", color: "blue" },
];

const MOCK_TILES = [
    { id: 0, resource: "Wheat", number: 11, q: 0, r: 0, s: 0 },
    { id: 1, resource: "Brick", number: 3, q: 1, r: -1, s: 0 },
    { id: 2, resource: "Brick", number: 6, q: 0, r: -1, s: 1 },
    { id: 3, resource: "Wheat", number: 5, q: -1, r: 0, s: 1 },
    { id: 4, resource: "Wood", number: 4, q: -1, r: 1, s: 0 },
    { id: 5, resource: "Ore", number: 9, q: 0, r: 1, s: -1 },
    { id: 6, resource: "Wheat", number: 10, q: 1, r: 0, s: -1 },
    { id: 7, resource: "Sheep", number: 8, q: 2, r: -2, s: 0 },
    { id: 8, resource: "Desert", number: 0, q: 1, r: -2, s: 1 },
    { id: 9, resource: "Ore", number: 4, q: 0, r: -2, s: 2 },
    { id: 10, resource: "Wood", number: 11, q: -1, r: -1, s: 2 },
    { id: 11, resource: "Wheat", number: 12, q: -2, r: 0, s: 2 },
    { id: 12, resource: "Brick", number: 9, q: -2, r: 1, s: 1 },
    { id: 13, resource: "Sheep", number: 10, q: -2, r: 2, s: 0 },
    { id: 14, resource: "Wood", number: 8, q: -1, r: 2, s: -1 },
    { id: 15, resource: "Sheep", number: 3, q: 0, r: 2, s: -2 },
    { id: 16, resource: "Wood", number: 6, q: 1, r: 1, s: -2 },
    { id: 17, resource: "Sheep", number: 2, q: 2, r: 0, s: -2 },
    { id: 18, resource: "Ore", number: 5, q: 2, r: -1, s: -1 },
];

export class MockCommunicationService implements ICommunicationService {
    private handlers: { [requestType: string]: IncomingEvent } = {};

    constructor() {
        [new HandleLoginOk(), new HandleChatMessage(), new HandleRoomInfo(), new HandleRoomList(), new HandleAddUserToRoomMessage(), new HandleRemoveUserFromRoom(), new HandleRoomRejected(), new HandleGameState()].forEach(h => {
            this.handlers[h.getRequestType()] = h;
        });
    }

    connect(): Promise<void> {
        logger.info("Mock connected — no real server");
        setTimeout(() => this.dispatch("loginOk", MOCK_USER), 50);
        return Promise.resolve();
    }

    disconnect(): void {
        logger.info("Mock disconnected");
    }

    send(message: OutgoingMessage): void {
        logger.debug("Mock send", { requestType: message.requestType });
        const payload = message.getPayload() as Record<string, unknown>;

        switch (message.requestType) {
            case "login":
                // login is handled by the connect() dispatch above; ignore duplicates
                break;
            case "roomList":
                this.dispatch("roomList", MOCK_ROOMS);
                break;
            case "createRoom":
                this.dispatch("prepareRoom", MOCK_ROOM_INFO);
                setTimeout(() => this.dispatch("addUserToRoom", MOCK_ROOM_USERS), 30);
                break;
            case "joinRoom":
                this.joinRoom(payload.roomId as string);
                break;
            case "chatMessage":
                this.dispatch("chatMessage", { virtualId: 1, message: payload.message });
                break;
            case "roomStartGame":
                this.dispatch("gameState", { gameState: "IN_GAME", tiles: MOCK_TILES });
                break;
            default:
                logger.warn("No mock handler for requestType: " + message.requestType);
        }
    }

    private dispatch(requestType: string, payload: unknown) {
        const handler = this.handlers[requestType];
        if (handler == null) {
            logger.warn("No incoming handler registered for: " + requestType);
            return;
        }
        handler.handle({ requestType, payload });
    }

    private joinRoom(roomId: string) {
        const room = MOCK_ROOMS.find(r => r.roomId === roomId);
        if (room == null) {
            this.dispatch("roomRejected", { reason: "Room not found" });
            return;
        }
        this.dispatch("prepareRoom", { ...MOCK_ROOM_INFO, roomId });
        setTimeout(() => this.dispatch("addUserToRoom", MOCK_ROOM_USERS), 30);
    }
}
