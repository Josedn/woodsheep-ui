import CommunicationService from "./communication/CommunicationService";
import { Logger } from "./Logger";

export class GameEngine {
    private static gameInstance: GameEngine;
    private communicationManager: CommunicationService;

    constructor() {
        this.communicationManager = new CommunicationService();
        Logger.debug("Engine constructed");
    }

    static getGame(): GameEngine {
        if (this.gameInstance == null) {
            Logger.error("Game not initialized!");
        }
        return this.gameInstance;
    }

    static initialize() {
        if (this.gameInstance == null) {
            this.gameInstance = new GameEngine();
        } else {
            Logger.error("Game already initialized!");
        }
        return this.gameInstance;
    }
}
