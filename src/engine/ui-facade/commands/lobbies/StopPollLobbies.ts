import type { GameEngine } from "../../GameEngine";
import type { GameCommand } from "../UIFacade";

export class StopPollLobbies implements GameCommand {
    execute(game: GameEngine) {
        game.lobbyService.stopPolling();
    }
}
