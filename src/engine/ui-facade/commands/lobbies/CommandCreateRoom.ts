import type { GameEngine } from "../../../GameEngine";
import type { GameCommand } from "../../UIFacade";

export class CommandCreateRoom implements GameCommand {
    execute(game: GameEngine) {
        game.lobbyService.requestCreateRoom();
    }
}
