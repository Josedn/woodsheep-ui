import { GameEngine } from "./GameEngine";
import { deleteCookie, setCookie } from "./misc/CookieUtils";

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

    public joinExistingGame(groupId: number, maxSize: number) {
        const userName = "preactUser";
        const groupSize = maxSize;
        const victoryPoints = 10;
        const isDecimal = false;
        const isDynamic = false;
        const isStandard = false;

        setCookie("desiredGroupId", groupId.toString());
        setCookie("userName", userName);
        setCookie("numPlayersDesired", groupSize.toString());
        setCookie("victoryPoints", victoryPoints.toString());
        setCookie("isDecimal", isDecimal.toString());
        setCookie("isDynamic", isDynamic.toString());
        setCookie("isStandard", isStandard.toString());
        deleteCookie("USER_ID");
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
