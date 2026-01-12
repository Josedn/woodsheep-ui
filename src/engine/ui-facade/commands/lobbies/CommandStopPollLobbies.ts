import type { GameEngine } from "../../../GameEngine";
import type { GameCommand } from "../../UIFacade";

export class CommandStopPollLobbies implements GameCommand {
    execute(game: GameEngine) {
        game.lobbyService.stopPolling();
    }
}
