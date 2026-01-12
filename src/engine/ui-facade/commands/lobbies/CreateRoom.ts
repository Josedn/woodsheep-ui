import type { GameEngine } from "../../../GameEngine";
import type { GameCommand } from "../../UIFacade";

export class CreateRoom implements GameCommand {
    execute(game: GameEngine) {
        game.lobbyService.requestCreateRoom();
    }
}
