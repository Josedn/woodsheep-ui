import type { GameEngine } from "../../GameEngine";
import type { GameCommand } from "../UIFacade";

export class SendChatMessage implements GameCommand {
    private message: string;
    constructor(message: string) {
        this.message = message;
    }

    execute(game: GameEngine) {
        game.lobbyService.sendChatMessage(this.message);
    }
}
