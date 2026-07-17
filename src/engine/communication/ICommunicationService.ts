import type { OutgoingMessage } from "./protocol/OutgoingMessage";

export interface ICommunicationService {
    connect(): Promise<void>;
    disconnect(): void;
    send(message: OutgoingMessage): void;
}
