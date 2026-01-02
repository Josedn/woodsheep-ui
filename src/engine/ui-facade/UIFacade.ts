import { GameEngine } from "../GameEngine";
import type { GroupInfo } from "../LobbyService";
import { createLogger } from "../misc/Logger";
import type { UserInfo } from "../ProfileService";

const logger = createLogger("UIFacade");

export const UI_EVENTS = {
    UPDATE_LOBBIES: "updateLobbies",
    UPDATE_USER_INFO: "updateUserInfo",
    NAVIGATE: "navigate",
} as const;

export type UIGameEvents = {
    //Lobby
    updateLobbies: { groups: GroupInfo[]; atLimit: boolean };

    //User
    updateUserInfo: { userInfo: UserInfo };

    navigate: { page: string };
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
        command.execute(GameEngine.getGame());
    }
}
