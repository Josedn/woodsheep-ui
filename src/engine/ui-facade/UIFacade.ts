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

    public on<K extends keyof UIGameEvents>(event: K, cb: (data: UIGameEvents[K]) => void) {
        this.listeners[event] ??= [];
        this.listeners[event]!.push(cb);
        //logger.debug("Subscribed " + event);
        return () => {
            //logger.debug("Unsubscribed " + event);
            this.listeners[event] = [];
        };
    }

    public emit<K extends keyof UIGameEvents>(event: K, data: UIGameEvents[K]) {
        this.listeners[event]?.forEach(cb => cb(data));
    }

    public dispatch(command: GameCommand) {
        logger.debug("Dispatching", { command });
        command.execute(GameEngine.getGame());
    }
}
