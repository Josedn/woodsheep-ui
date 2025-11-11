import type { HexCoordinate } from "./Tile";

export class Intersection {
    coord1: HexCoordinate;
    coord2: HexCoordinate;
    coord3: HexCoordinate;

    constructor(coord1: HexCoordinate, coord2: HexCoordinate, coord3: HexCoordinate) {
        this.coord1 = coord1;
        this.coord2 = coord2;
        this.coord3 = coord3;
    }
}
