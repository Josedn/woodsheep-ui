import { GameEngine } from "../../GameEngine";
import type { IncomingEvent } from "../protocol/IncomingEvent";
import type { IncomingMessage } from "../protocol/IncomingMessage";

type ChatMessageData = {
    virtualId: number;
    message: string;
};

export class HandleChatMessage implements IncomingEvent {
    handle(request: IncomingMessage): void {
        const { virtualId, message } = request.payload as ChatMessageData;
        GameEngine.getGame().lobbyService.addChatMessage(virtualId, message);
    }
    getRequestType(): string {
        return "chatMessage";
    }
}
