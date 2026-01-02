import type { GroupInfo } from "../LobbyService";

export class UIFacade {
    //Lobby
    onLobbiesUpdate: (groups: GroupInfo[], atLimit: boolean) => void = () => {};
}
