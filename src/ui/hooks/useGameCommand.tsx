import { useEffect } from "preact/hooks";
import type { GameCommand, UIGameEventKey, UIGameEvents } from "../../engine/ui/UIFacade";
import { GameEngine } from "../../engine/GameEngine";

export function useGameCommand<K extends GameCommand>(gameCommand: K) {
    GameEngine.getGame().uiFacade.dispatch(gameCommand);
}
