import type { GameEngine } from "../../../GameEngine";
import type { GameCommand } from "../../UIFacade";

export class CommandBuildSettlement implements GameCommand {
    private nodeId: number;

    constructor(nodeId: number) {
        this.nodeId = nodeId;
    }

    execute(game: GameEngine) {
        game.gameService.requestBuildSettlement(this.nodeId);
    }
}
