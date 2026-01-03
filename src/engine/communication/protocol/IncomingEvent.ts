import type { IncomingMessage } from "./IncomingMessage";

export interface IncomingEvent {
    handle(request: IncomingMessage): void;
    getRequestType(): string;
}
