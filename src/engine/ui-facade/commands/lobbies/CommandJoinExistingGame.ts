import type { GameEngine } from "../../../GameEngine";
import type { GameCommand } from "../../UIFacade";

export class CommandJoinExistingGame implements GameCommand {
    private roomId: string;
    constructor(roomId: string) {
        this.roomId = roomId;
    }

    execute(game: GameEngine) {
        game.uiFacade.emit("navigate", { page: `lobby/${this.roomId}` });
    }
}
