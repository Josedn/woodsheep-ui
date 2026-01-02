import type { GameEngine } from "../../GameEngine";
import { Logger } from "../../misc/Logger";
import type { GameCommand } from "../UIFacade";

class SendChatMessage implements GameCommand {
    private message: string;
    constructor(message: string) {
        this.message = message;
    }

    execute(game: GameEngine) {
        Logger.debug("Executing command");
    }
}
