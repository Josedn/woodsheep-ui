import CommunicationService from "./communication/CommunicationService";
import TempGroupCommunicationService from "./communication/TempGroupCommunicationService";
import { LobbyService } from "./LobbyService";
import { deleteCookie } from "./misc/CookieUtils";
import { env } from "./misc/env";
import { Logger } from "./misc/Logger";
import { ProfileService } from "./ProfileService";
import { UIFacade } from "./ui/UIFacade";

export class GameEngine {
    private static gameInstance: GameEngine;
    private groupCommunicationService: TempGroupCommunicationService;
    private gameCommunicationService: CommunicationService;
    public lobbyService: LobbyService;
    public uiFacade: UIFacade;
    public profileService: ProfileService;

    constructor() {
        this.groupCommunicationService = new TempGroupCommunicationService(env.wsBaseUrl + "/groups/");
        this.gameCommunicationService = new CommunicationService(env.wsBaseUrl + "/action/");
        this.lobbyService = new LobbyService();
        this.uiFacade = new UIFacade();
        this.profileService = new ProfileService();

        Logger.debug("Engine constructed");
    }

    initialize() {
        //TODO: review
        const href = window.location.pathname;
        if (href == "/") {
            deleteCookie("desiredGroupId");
        }
    }

    static getGame(): GameEngine {
        if (this.gameInstance == null) {
            this.gameInstance = new GameEngine();
        }
        return this.gameInstance;
    }
}
