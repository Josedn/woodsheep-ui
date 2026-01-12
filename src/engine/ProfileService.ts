import { RequestHandshake } from "./communication/outgoing/RequestHandshake";
import { GameEngine } from "./GameEngine";
import { UI_EVENTS } from "./ui-facade/UIFacade";

export type UserInfo = {
    userId: string;
    username: string;
};

export class ProfileService {
    public currentUser: UserInfo;

    constructor() {
        this.currentUser = { username: "", userId: "" };
    }

    public loadUser() {
        const { storeService } = GameEngine.getGame();
        const sso = storeService.get("sso") ?? "";
        GameEngine.getGame().gameCommunicationService.send(new RequestHandshake(sso));
    }

    public setUser(userInfo: UserInfo) {
        this.currentUser = userInfo;
        this.emitUserUpdate();
    }

    public emitUserUpdate() {
        GameEngine.getGame().uiFacade.emit(UI_EVENTS.UPDATE_USER_INFO, { userInfo: this.currentUser });
    }
}
