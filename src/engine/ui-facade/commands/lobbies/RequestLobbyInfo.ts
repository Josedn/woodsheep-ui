import type { GameEngine } from "../../../GameEngine";
import type { GameCommand } from "../../UIFacade";

export class RequestLobbyInfo implements GameCommand {
    execute(game: GameEngine) {
        game.lobbyService.requestLobbyInfo();
    }
}
