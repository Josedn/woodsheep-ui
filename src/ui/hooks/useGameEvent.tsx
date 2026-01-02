import { useEffect } from "preact/hooks";
import type { UIGameEventKey, UIGameEvents } from "../../engine/ui/UIFacade";
import { GameEngine } from "../../engine/GameEngine";

export function useGameEvent<K extends UIGameEventKey>(event: K, handler: (payload: UIGameEvents[K]) => void) {
    useEffect(() => {
        const unsubscribe = GameEngine.getGame().uiFacade.on(event, handler);
        return unsubscribe;
    }, [event, handler]);
}
