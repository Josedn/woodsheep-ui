import { Logger } from "../misc/Logger";
import { HandleSetCookie } from "./incoming/HandleSetCookie";
import type { IncomingEvent } from "./protocol/IncomingEvent";
import { IncomingMessage } from "./protocol/IncomingMessage";
import { WebSocketClient, type IMessageHandler } from "./WebSocketClient";

export default class CommunicationService implements IMessageHandler {
    client: WebSocketClient;
    requestHandlers: { [requestType: string]: IncomingEvent };
    url: string;

    constructor(url: string) {
        this.url = url;
        this.client = new WebSocketClient(this);
        this.requestHandlers = {};
        this.registerRequests();
    }

    private registerRequests() {
        this.requestHandlers[HandleSetCookie.getRequestType()] = new HandleSetCookie();
    }

    disconnect() {
        this.client.disconnect();
    }

    connect(): Promise<void> {
        Logger.debug("Connecting to " + this.url);
        return this.client.connect(this.url);
    }

    handleMessage(data: string): void {
        if (data == "HEARTBEAT") {
            return;
        }

        const message = new IncomingMessage(data);
        const handler = this.requestHandlers[message.requestType];
        if (handler != null) {
            Logger.debug("Handled [" + message.requestType + "]: " + handler.constructor.name);
            handler.handle(message);
        } else {
            Logger.warn("No handler for requestType: " + message.requestType);
        }
    }

    handleOpenConnection(): void {
        Logger.info("Connection open");
    }
    handleCloseConnection(): void {
        Logger.info("Connection closed");
    }
    handleConnectionError(): void {
        Logger.info("Connection error");
    }
}
