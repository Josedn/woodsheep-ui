import CommunicationService from "./communication/CommunicationService";
import { LobbyService } from "./LobbyService";
import { deleteCookie } from "./misc/CookieUtils";
import { env } from "./misc/env";
import { Logger } from "./misc/Logger";

export class GameEngine {
    private static gameInstance: GameEngine;
    private groupCommunicationService: CommunicationService;
    private gameCommunicationService: CommunicationService;
    public lobbyService: LobbyService;

    constructor() {
        this.groupCommunicationService = new CommunicationService();
        this.gameCommunicationService = new CommunicationService();
        this.lobbyService = new LobbyService();
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
