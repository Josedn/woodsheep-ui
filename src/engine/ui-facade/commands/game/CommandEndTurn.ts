import type { GameEngine } from "../../../GameEngine";
import type { GameCommand } from "../../UIFacade";

export class CommandEndTurn implements GameCommand {
    execute(game: GameEngine) {
        game.gameService.requestEndTurn();
    }
}
