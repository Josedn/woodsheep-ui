import { GameEngine } from "../../GameEngine";
import type { IncomingEvent } from "../protocol/IncomingEvent";
import type { IncomingMessage } from "../protocol/IncomingMessage";

type LoginOkData = {
    userId: string;
    username: string;
};

export class HandleLoginOk implements IncomingEvent {
    handle(request: IncomingMessage): void {
        const { userId, username } = request.payload as LoginOkData;
        GameEngine.getGame().profileService.setUser({ username, userId });
    }
    getRequestType(): string {
        return "loginOk";
    }
}
