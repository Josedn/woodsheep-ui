import { createLogger } from "../misc/Logger";
import { HandleError } from "./incoming/HandleError";
import { HandleGameState } from "./incoming/HandleGameState";
import { HandleSetCookie } from "./incoming/HandleSetCookie";
import type { IncomingEvent } from "./protocol/IncomingEvent";
import { IncomingMessage } from "./protocol/IncomingMessage";
import type { OutgoingMessage } from "./protocol/OutgoingMessage";
import { WebSocketClient, type IMessageHandler } from "./WebSocketClient";

const logger = createLogger("CommunicationService");

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
        this.requestHandlers[HandleError.getRequestType()] = new HandleError();
        this.requestHandlers[HandleGameState.getRequestType()] = new HandleGameState();
    }

    send(message: OutgoingMessage) {
        if (this.client.connected) {
            this.client.send(message.stringify());
        }
    }

    disconnect() {
        this.client.disconnect();
    }

    connect(): Promise<void> {
        if (!this.client.connected) {
            logger.debug("Connecting to " + this.url);
            return this.client.connect(this.url);
        }
        return Promise.resolve();
    }

    handleMessage(data: string): void {
        if (data == "HEARTBEAT") {
            return;
        }

        const message = new IncomingMessage(data);
        const handler = this.requestHandlers[message.requestType];
        if (handler != null) {
            logger.debug("Handled [" + message.requestType + "]: " + handler.constructor.name);
            handler.handle(message);
        } else {
            logger.warn("No handler for requestType: " + message.requestType, { request: message });
        }
    }

    handleOpenConnection(): void {
        logger.info("Connection open");
    }
    handleCloseConnection(): void {
        logger.info("Connection closed");
    }
    handleConnectionError(): void {
        logger.info("Connection error");
    }
}
