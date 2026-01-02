import type { Tile } from "./Tile";

class Board {
    transX: number;
    transY: number;
    scaleFactor: number;

    tiles: Tile[];
    intersections: [];
    paths: [];

    constructor(boardX: number, boardY: number, boardScale: number) {
        this.transX = boardX;
        this.transY = boardY;
        this.scaleFactor = boardScale;
        this.tiles = [];
        this.intersections = [];
        this.paths = [];
    }
}
