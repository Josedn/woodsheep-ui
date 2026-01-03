import { GameEngine } from "./GameEngine";

export type UserInfo = {
    userName: string;
};

const getRandomArbitrary = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
};

export class ProfileService {
    public currentUser: UserInfo;

    constructor() {
        const userName = "PreactUser#" + getRandomArbitrary(111, 999).toString();
        this.currentUser = { userName };
    }

    public setUser(userInfo: UserInfo) {
        this.currentUser = userInfo;
        this.emitUserUpdate();
    }

    public emitUserUpdate() {
        GameEngine.getGame().uiFacade.emit("updateUserInfo", { userInfo: this.currentUser });
    }
}
