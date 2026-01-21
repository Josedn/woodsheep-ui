import { GameEngine } from "../GameEngine";
import type { ChatMessageReceived, CurrentRoomInfo, RoomUserData, ShortRoomInfo } from "../LobbyService";
import { createLogger } from "../misc/Logger";
import type { UserInfo } from "../ProfileService";

const logger = createLogger("UIFacade");

export const UI_EVENTS = {
    UPDATE_LOBBIES_LIST: "updateLobbiesList",
    UPDATE_USER_INFO: "updateUserInfo",
    NAVIGATE: "navigate",
    UPDATE_LOBBY_PLAYERS: "updateLobbyPlayers",
    UPDATE_LOBBY_INFO: "updateLobbyInfo",
    UPDATE_CHAT_MESSAGES: "updateChatMessages",
    HANDLE_ERROR: "handleError",
} as const;

export type UIGameEvents = {
    //Lobby
    updateLobbiesList: { rooms: ShortRoomInfo[] };
    updateLobbyInfo: { roomInfo: CurrentRoomInfo };
    updateChatMessages: { chatMessages: ChatMessageReceived[] };
    updateLobbyPlayers: { players: RoomUserData[] };

    //User
    updateUserInfo: { userInfo: UserInfo };

    navigate: { page: string };

    //Misc
    handleError: { errorMessage: string };
};

export type UIGameEventKey = keyof UIGameEvents;

export interface GameCommand {
    execute(game: GameEngine): void;
}

export class UIFacade {
    private listeners: {
        [K in keyof UIGameEvents]?: ((data: UIGameEvents[K]) => void)[];
    } = {};
    private queue: {
        [K in keyof UIGameEvents]?: UIGameEvents[K][];
    } = {};

    public on<K extends keyof UIGameEvents>(event: K, cb: (data: UIGameEvents[K]) => void) {
        this.listeners[event] ??= [];
        this.listeners[event]!.push(cb);
        //logger.debug("Subscribed " + event);
        // Flush any queued events that were emitted before listeners existed
        const queued = this.queue[event];
        if (queued && queued.length) {
            // deliver to all current listeners in order
            queued.forEach(payload => {
                this.listeners[event]!.forEach(l => l(payload as any));
            });
            this.queue[event] = [];
        }
        return () => {
            //logger.debug("Unsubscribed " + event);
            const arr = this.listeners[event];
            if (arr) {
                this.listeners[event] = arr.filter(l => l !== cb) as any;
            }
        };
    }

    public emit<K extends keyof UIGameEvents>(event: K, data: UIGameEvents[K]) {
        const arr = this.listeners[event];
        if (arr && arr.length) {
            arr.forEach(cb => cb(data));
        } else {
            // No listeners yet; queue the event
            this.queue[event] ??= [] as any;
            (this.queue[event] as UIGameEvents[K][]).push(data);
        }
    }

    public dispatch(command: GameCommand) {
        logger.debug("Dispatching", { command });
        command.execute(GameEngine.getGame());
    }
}
