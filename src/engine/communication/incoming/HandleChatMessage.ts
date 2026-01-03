import { GameEngine } from "../../GameEngine";
import type { ChatMessageReceived } from "../../LobbyService";
import type { IncomingEvent } from "../protocol/IncomingEvent";
import type { IncomingMessage } from "../protocol/IncomingMessage";

export class HandleChatMessage implements IncomingEvent {
    handle(request: IncomingMessage): void {
        if (request.body.logs) {
            const logs = request.body.logs as ChatMessageReceived[];
            GameEngine.getGame().lobbyService.setChatMessages(logs);
        } else {
            const data = request.body as any;
            GameEngine.getGame().lobbyService.addChatMessage({
                content: data.content,
                sender: data.sender,
                timestamp: data.timeStamp,
                userId: data.userId,
            });
        }
    }
    getRequestType(): string {
        return "chat";
    }
}
