export const degToRad = (degrees: number): number => {
    return degrees * (Math.PI / 180);
};

const X_UNIT_VEC: CartesianCoordinate = { x: Math.sin(degToRad(300)), y: Math.cos(degToRad(300)) };
const Y_UNIT_VEC: CartesianCoordinate = { x: Math.sin(degToRad(60)), y: Math.cos(degToRad(60)) };
const Z_UNIT_VEC: CartesianCoordinate = { x: Math.sin(degToRad(180)), y: Math.cos(degToRad(180)) };

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
    GOLD: "Gold",
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

/*
 * Finds the center of three hex coordinates
 * @param c1 - the first hex coordinate
 * @param c2 - the second hex coordinate
 * @param c3 - the third hex coordinate
 * @return the center of the three hex coordinates, as a hex coordinate
 */
export const findCenter = (c1: HexCoordinate, c2: HexCoordinate, c3: HexCoordinate) => {
    const x = (c1.x + c2.x + c3.x) / 3;
    const y = (c1.y + c2.y + c3.y) / 3;
    const z = (c1.z + c2.z + c3.z) / 3;

    return { x: x, y: y, z: z };
};

/*
 * Finds the center of two hex coordinates
 * @param c1 - the first hex coordinate
 * @param c2 - the second hex coordinate
 * @return the center of the three hex coordinates, as a hex coordinate
 */
export const findCenter2c = (c1: HexCoordinate, c2: HexCoordinate) => {
    const x = (c1.x + c2.x) / 2;
    const y = (c1.y + c2.y) / 2;
    const z = (c1.z + c2.z) / 2;

    return { x: x, y: y, z: z };
};
