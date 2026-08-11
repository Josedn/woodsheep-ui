import type { GameEngine } from "../../../GameEngine";
import type { GameCommand } from "../../UIFacade";

export class CommandRollDice implements GameCommand {
    execute(game: GameEngine) {
        game.gameService.requestRoll();
    }
}
