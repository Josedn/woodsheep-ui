import { WebSocketClient, type IMessageHandler } from "./WebSocketClient";

export default class CommunicationService implements IMessageHandler {
    client: WebSocketClient;

    constructor() {
        this.client = new WebSocketClient(this);
    }

    connect(connectionURL: string): Promise<void> {
        return this.client.connect(connectionURL);
    }

    handleMessage(message: string): void {
        throw new Error("Method not implemented.");
    }
    handleOpenConnection(): void {
        throw new Error("Method not implemented.");
    }
    handleCloseConnection(): void {
        throw new Error("Method not implemented.");
    }
    handleConnectionError(): void {
        throw new Error("Method not implemented.");
    }
}
