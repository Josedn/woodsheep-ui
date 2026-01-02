import type { GameEngine } from "../../../GameEngine";
import type { GameCommand } from "../../UIFacade";

export class JoinExistingGame implements GameCommand {
    private groupId: string;
    constructor(groupId: string) {
        this.groupId = groupId;
    }

    execute(game: GameEngine) {
        game.lobbyService.joinExistingGame(this.groupId);
    }
}
