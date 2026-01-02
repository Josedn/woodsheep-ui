import { GameEngine } from "../GameEngine";
import type { GroupInfo } from "../LobbyService";
import { createLogger } from "../misc/Logger";
import { WebSocketClient, type IMessageHandler } from "./WebSocketClient";

const logger = createLogger("TempGroupCommunicationService");

type GroupMessage = {
    groups: GroupInfo[];
    atLimit: boolean;
};

export default class TempGroupCommunicationService implements IMessageHandler {
    client: WebSocketClient;
    url: string;

    constructor(url: string) {
        this.url = url;
        this.client = new WebSocketClient(this);
    }

    disconnect() {
        this.client.disconnect();
    }

    connect(): Promise<void> {
        logger.debug("Connecting to " + this.url);
        return this.client.connect(this.url);
    }

    handleMessage(data: string): void {
        logger.debug("Received " + data);
        // TODO: refactor group
        const parsed = JSON.parse(data);
        if (data == "HEARTBEAT") {
            return;
        }

        if (parsed.atLimit != null && parsed.groups != null) {
            const groupMessage = parsed as GroupMessage;
            GameEngine.getGame().lobbyService.handleLobbyUpdate(groupMessage.groups, groupMessage.atLimit);
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
