import { GameEngine } from "../../GameEngine";
import type { IncomingEvent } from "../protocol/IncomingEvent";
import type { IncomingMessage } from "../protocol/IncomingMessage";

export class HandleError implements IncomingEvent {
    handle(request: IncomingMessage): void {
        const data = request.body;
        switch (data.description) {
            case "RESET":
                GameEngine.getGame().lobbyService.resetEverythingAndGoHome();
                break;
            case "NOT_REGISTERED":
                alert("Internal error : user not registered");
                break;
            case "FULL_GAME":
                alert("Game is full");
                break;
            case "DUPLICATE_TAB":
                alert("Tab is duplicated");
                break;
            default:
                console.log(data.description);
        }
    }
    getRequestType(): string {
        return "ERROR";
    }
}
