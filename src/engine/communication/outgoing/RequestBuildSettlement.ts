import { OutgoingMessage } from "../protocol/OutgoingMessage";

export class RequestBuildSettlement extends OutgoingMessage {
    nodeId: number;
    constructor(nodeId: number) {
        super("buildSettlement");
        this.nodeId = nodeId;
    }

    getPayload() {
        return { nodeId: this.nodeId };
    }
}
