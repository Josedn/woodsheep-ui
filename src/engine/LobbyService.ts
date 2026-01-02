import { GameEngine } from "./GameEngine";
import { deleteCookie, setCookie } from "./misc/CookieUtils";

export class LobbyService {
    lobbies: GroupInfo[];
    // TODO: review limit
    atLimit: boolean;
    inGame: boolean;

    constructor() {
        this.lobbies = [];
        this.atLimit = false;
        this.inGame = false;
    }

    public pollLobbies() {
        GameEngine.getGame().groupCommunicationService.connect();
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
        const userName = "preactUser";
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

        GameEngine.getGame().uiFacade.emit("navigate", { page: "lobby" });
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
