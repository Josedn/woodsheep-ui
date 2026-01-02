import type { GameEngine } from "../../GameEngine";
import { createLogger } from "../../misc/Logger";
import type { GameCommand } from "../UIFacade";

const logger = createLogger("SendChatMessage");

class SendChatMessage implements GameCommand {
    private message: string;
    constructor(message: string) {
        this.message = message;
    }

    execute(game: GameEngine) {
        logger.debug("Executing command");
    }
}
