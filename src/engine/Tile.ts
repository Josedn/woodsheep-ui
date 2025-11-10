const X_UNIT_VEC: CartesianCoordinate = { x: Math.sqrt(3) / 2, y: 0.5 };
const Y_UNIT_VEC: CartesianCoordinate = { x: 0, y: -1 };
const Z_UNIT_VEC: CartesianCoordinate = { x: -Math.sqrt(3) / 2, y: 0.5 };

export interface HexCoordinate {
    x: number;
    y: number;
    z: number;
}

export interface CartesianCoordinate {
    x: number;
    y: number;
}

export const TileType = {
    BRICK: "Brick",
    WOOD: "Wood",
    ORE: "Ore",
    WHEAT: "Wheat",
    SHEEP: "Sheep",
    DESERT: "Desert",
    SEA: "Sea",
} as const;

export type TileType = (typeof TileType)[keyof typeof TileType];

export class Tile {
    coordinate: HexCoordinate;
    number: number;
    tileType: TileType;

    constructor(coordinate: HexCoordinate, number: number, tileType: TileType) {
        this.coordinate = coordinate;
        this.number = number;
        this.tileType = tileType;
    }
}

/*
 * Converts a hex coordinate into a cartesian coordinate
 * @param hexCoordinates - the hex coordinate
 * @return the cartesian coordinate
 */
export const hexToCartesian = (hexCoordinates: HexCoordinate): CartesianCoordinate => {
    const x = X_UNIT_VEC.x * hexCoordinates.x + Y_UNIT_VEC.x * hexCoordinates.y + Z_UNIT_VEC.x * hexCoordinates.z;
    const y = X_UNIT_VEC.y * hexCoordinates.x + Y_UNIT_VEC.y * hexCoordinates.y + Z_UNIT_VEC.y * hexCoordinates.z;
    return { x: x, y: y };
};
