import type { GameEngine } from "../../../GameEngine";
import type { GameCommand } from "../../UIFacade";

export class CommandStartGame implements GameCommand {
    execute(game: GameEngine) {
        game.lobbyService.requestStartGame();
    }
}
