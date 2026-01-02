import type { HexCoordinate } from "./Tile";

export class Path {
    start1: HexCoordinate;
    start2: HexCoordinate;
    start3: HexCoordinate;
    end1: HexCoordinate;
    end2: HexCoordinate;
    end3: HexCoordinate;

    constructor(start1: HexCoordinate, start2: HexCoordinate, start3: HexCoordinate, end1: HexCoordinate, end2: HexCoordinate, end3: HexCoordinate) {
        this.start1 = start1;
        this.start2 = start2;
        this.start3 = start3;
        this.end1 = end1;
        this.end2 = end2;
        this.end3 = end3;
    }
}
