import { GameEngine } from "./GameEngine";

export class LobbyService {
    lobbies: GroupInfo[];
    // TODO: review limit
    atLimit: boolean;

    constructor() {
        this.lobbies = [];
        this.atLimit = false;
    }

    public handleLobbyUpdate(groups: GroupInfo[], atLimit: boolean) {
        this.lobbies = groups;
        this.atLimit = atLimit;

        GameEngine.getGame().uiFacade.emit("updateLobbies", { groups, atLimit });
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
