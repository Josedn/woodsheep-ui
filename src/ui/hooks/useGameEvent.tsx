import { useEffect, useRef } from "preact/hooks";
import type { UIGameEventKey, UIGameEvents } from "../../engine/ui-facade/UIFacade";
import { GameEngine } from "../../engine/GameEngine";

export function useGameEvent<K extends UIGameEventKey>(event: K, handler: (payload: UIGameEvents[K]) => void) {
    const handlerRef = useRef(handler);
    handlerRef.current = handler;

    useEffect(() => {
        return GameEngine.getGame().uiFacade.on(event, data => handlerRef.current(data));
    }, [event]);
}
