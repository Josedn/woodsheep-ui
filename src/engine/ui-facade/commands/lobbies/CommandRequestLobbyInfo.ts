import type { GameEngine } from "../../../GameEngine";
import type { GameCommand } from "../../UIFacade";

export class CommandRequestLobbyInfo implements GameCommand {
    execute(game: GameEngine) {
        game.lobbyService.requestLobbyInfo();
    }
}
