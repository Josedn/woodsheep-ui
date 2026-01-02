import type { GameEngine } from "../../GameEngine";
import type { GameCommand } from "../UIFacade";

export class GetUserInfo implements GameCommand {
    execute(game: GameEngine) {
        game.profileService.emitUserUpdate();
    }
}
