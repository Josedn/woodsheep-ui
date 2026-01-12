import { useState } from "preact/hooks";
import { PopUp } from "./PopUp";
import { useGameEvent } from "../../hooks/useGameEvent";
import { UI_EVENTS } from "../../../engine/ui-facade/UIFacade";

export const ErrorPopUp = () => {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isVisible, setVisible] = useState<boolean>(false);

    const handleClose = () => {
        setVisible(false);
    };

    useGameEvent(UI_EVENTS.HANDLE_ERROR, ({ errorMessage }) => {
        setVisible(true);
        setErrorMessage(errorMessage);
    });

    return (
        <>
            {isVisible && (
                <PopUp showClose onClose={handleClose} title="Error!!1">
                    {errorMessage}
                </PopUp>
            )}
        </>
    );
};
