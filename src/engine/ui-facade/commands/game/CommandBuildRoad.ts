import type { GameEngine } from "../../../GameEngine";
import type { GameCommand } from "../../UIFacade";

export class CommandBuildRoad implements GameCommand {
    private nodeA: number;
    private nodeB: number;

    constructor(nodeA: number, nodeB: number) {
        this.nodeA = nodeA;
        this.nodeB = nodeB;
    }

    execute(game: GameEngine) {
        game.gameService.requestBuildRoad(this.nodeA, this.nodeB);
    }
}
