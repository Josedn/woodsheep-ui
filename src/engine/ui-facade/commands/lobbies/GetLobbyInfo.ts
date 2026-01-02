import type { GameEngine } from "../../../GameEngine";
import type { GameCommand } from "../../UIFacade";

export class GetLobbyInfo implements GameCommand {
    execute(game: GameEngine) {
        game.lobbyService.requestLobbyInfo();
    }
}
