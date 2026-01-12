import type { GameEngine } from "../../../GameEngine";
import type { GameCommand } from "../../UIFacade";

export class CommandRequestLobbyInfo implements GameCommand {
    private roomId: string;
    constructor(roomId: string) {
        this.roomId = roomId;
    }
    execute(game: GameEngine) {
        game.lobbyService.requestLobbyInfo(this.roomId);
    }
}
