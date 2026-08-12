import { OutgoingMessage } from "../protocol/OutgoingMessage";

export class RequestBuildRoad extends OutgoingMessage {
    nodeA: number;
    nodeB: number;
    constructor(nodeA: number, nodeB: number) {
        super("buildRoad");
        this.nodeA = nodeA;
        this.nodeB = nodeB;
    }

    getPayload() {
        return { nodeA: this.nodeA, nodeB: this.nodeB };
    }
}
