import type { GroupInfo } from "../LobbyService";
import { Logger } from "../misc/Logger";

export const UI_EVENTS = {
    UPDATE_LOBBIES: "updateLobbies",
} as const;

export type UIGameEvents = {
    updateLobbies: { groups: GroupInfo[]; atLimit: boolean };
};

export type UIGameEventKey = keyof UIGameEvents;

export class UIFacade {
    private listeners: {
        [K in keyof UIGameEvents]?: ((data: UIGameEvents[K]) => void)[];
    } = {};

    on<K extends keyof UIGameEvents>(event: K, cb: (data: UIGameEvents[K]) => void) {
        this.listeners[event] ??= [];
        this.listeners[event]!.push(cb);
        Logger.debug("Subscribed " + event);
        return () => {
            Logger.debug("Unsubscribed " + event);
            this.listeners[event] = [];
        };
    }

    emit<K extends keyof UIGameEvents>(event: K, data: UIGameEvents[K]) {
        this.listeners[event]?.forEach(cb => cb(data));
    }
}
