import type { GameEngine } from "../../../GameEngine";
import type { GameCommand } from "../../UIFacade";

export class CommandPollLobbies implements GameCommand {
    execute(game: GameEngine) {
        game.lobbyService.pollLobbies();
    }
}
