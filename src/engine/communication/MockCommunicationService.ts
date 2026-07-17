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
    { id: 0, resource: "Wood", number: 11 },
    { id: 1, resource: "Brick", number: 3 },
    { id: 2, resource: "Sheep", number: 6 },
    { id: 3, resource: "Wheat", number: 8 },
    { id: 4, resource: "Ore", number: 5 },
    { id: 5, resource: "Desert", number: 0 },
    { id: 6, resource: "Wood", number: 4 },
    { id: 7, resource: "Brick", number: 9 },
    { id: 8, resource: "Sheep", number: 10 },
    { id: 9, resource: "Wheat", number: 12 },
    { id: 10, resource: "Ore", number: 2 },
    { id: 11, resource: "Wood", number: 6 },
    { id: 12, resource: "Brick", number: 11 },
    { id: 13, resource: "Sheep", number: 3 },
    { id: 14, resource: "Wheat", number: 4 },
    { id: 15, resource: "Ore", number: 9 },
    { id: 16, resource: "Wood", number: 8 },
    { id: 17, resource: "Sheep", number: 10 },
    { id: 18, resource: "Wheat", number: 5 },
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
