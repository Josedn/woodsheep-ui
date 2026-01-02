import CommunicationService from "./communication/CommunicationService";
import TempGroupCommunicationService from "./communication/TempGroupCommunicationService";
import { LobbyService } from "./LobbyService";
import { deleteCookie } from "./misc/CookieUtils";
import { env } from "./misc/env";
import { Logger } from "./misc/Logger";
import { UIFacade } from "./ui/UIFacade";

export class GameEngine {
    private static gameInstance: GameEngine;
    private groupCommunicationService: TempGroupCommunicationService;
    private gameCommunicationService: CommunicationService;
    public lobbyService: LobbyService;
    public uiFacade: UIFacade;

    constructor() {
        this.groupCommunicationService = new TempGroupCommunicationService();
        this.gameCommunicationService = new CommunicationService();
        this.lobbyService = new LobbyService();
        this.uiFacade = new UIFacade();

        Logger.debug("Engine constructed");
    }

    initialize(): Promise<void> {
        //TODO: review
        const href = window.location.pathname;
        if (href == "/") {
            deleteCookie("desiredGroupId");
        }
        return this.groupCommunicationService.connect(env.wsBaseUrl + "/groups/");
    }

    static getGame(): GameEngine {
        if (this.gameInstance == null) {
            this.gameInstance = new GameEngine();
        }
        return this.gameInstance;
    }
}
