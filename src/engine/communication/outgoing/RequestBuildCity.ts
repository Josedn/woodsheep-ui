import { OutgoingMessage } from "../protocol/OutgoingMessage";

export class RequestBuildCity extends OutgoingMessage {
    nodeId: number;
    constructor(nodeId: number) {
        super("buildCity");
        this.nodeId = nodeId;
    }

    getPayload() {
        return { nodeId: this.nodeId };
    }
}
