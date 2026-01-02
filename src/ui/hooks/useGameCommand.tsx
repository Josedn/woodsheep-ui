import type { GameCommand } from "../../engine/ui/UIFacade";
import { GameEngine } from "../../engine/GameEngine";

export function useGameCommand<K extends GameCommand>(gameCommand: K) {
    GameEngine.getGame().uiFacade.dispatch(gameCommand);
}
