import CommunicationService from "./communication/CommunicationService";
import { LobbyService } from "./LobbyService";
import { env } from "./misc/env";
import { createLogger } from "./misc/Logger";
import { ProfileService } from "./ProfileService";
import { StoreService } from "./StoreService";
import { UI_EVENTS, UIFacade } from "./ui-facade/UIFacade";

const logger = createLogger("GameEngine");

export class GameEngine {
    public gameCommunicationService = new CommunicationService(env.wsBaseUrl + "/ws/game");
    public lobbyService = new LobbyService();
    public uiFacade = new UIFacade();
    public profileService = new ProfileService();
    public storeService = new StoreService();
    private initialized: boolean = false;
    private static gameInstance: GameEngine;

    public async initialize() {
        if (!this.initialized) {
            this.initialized = true;
            try {
                await this.gameCommunicationService.connect();
                this.profileService.loadUser();
            } catch (err) {
                this.die("Failed to start game");
            }
        }
    }

    public die(errorMessage: string) {
        logger.error(errorMessage);
        this.uiFacade.emit(UI_EVENTS.HANDLE_ERROR, { errorMessage });
    }

    static getGame(): GameEngine {
        if (this.gameInstance == null) {
            this.gameInstance = new GameEngine();
        }
        return this.gameInstance;
    }
}
