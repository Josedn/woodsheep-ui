import type { GameEngine } from "../../GameEngine";
import type { GameCommand } from "../UIFacade";

export class CommandGetUserInfo implements GameCommand {
    execute(game: GameEngine) {
        game.profileService.emitUserUpdate();
    }
}
