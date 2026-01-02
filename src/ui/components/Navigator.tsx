import { useLocation } from "preact-iso";
import { useGameEvent } from "../hooks/useGameEvent";
import { UI_EVENTS } from "../../engine/ui/UIFacade";

export const Navigator = () => {
    const location = useLocation();

    useGameEvent(UI_EVENTS.NAVIGATE, ({ page }) => {
        location.route("/" + page);
    });

    return <></>;
};
