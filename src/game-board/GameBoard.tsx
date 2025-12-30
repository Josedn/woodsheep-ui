import tileLumber from "../assets/game/tile_lumber.2f0099b519514f091763.svg";
import tileWool from "../assets/game/tile_wool.72fafecfd68aa740af09.svg";
import tileBrick from "../assets/game/tile_brick.3082910583708dd98c82.svg";
import tileOre from "../assets/game/tile_ore.0033829cd0573ced9c6f.svg";
import tileGrain from "../assets/game/tile_grain.f99882d0014743dba80b.svg";
import tileDesert from "../assets/game/tile_desert.25d3c496a667dfc64c17.svg";
import tileGold from "../assets/game/tile_gold.8232cea1f60dd524bbef.svg";
import prob2 from "../assets/game/prob_2.08c89e29dd2e12da2ea4.svg";
import prob3 from "../assets/game/prob_3.94270f97a8b15ab8d3ec.svg";
import prob4 from "../assets/game/prob_4.a2af3d909fad884353df.svg";
import prob5 from "../assets/game/prob_5.17073f845fcfa2267dd9.svg";
import prob6 from "../assets/game/prob_6.ada0b8434cfe315beb72.svg";
import prob8 from "../assets/game/prob_8.ca0de6260ba265cc479f.svg";
import prob9 from "../assets/game/prob_9.0dce1d649976660b463a.svg";
import prob10 from "../assets/game/prob_10.d145f244ff011dd7a427.svg";
import prob11 from "../assets/game/prob_11.102e16ed661168ddeec8.svg";
import prob12 from "../assets/game/prob_12.6031ada2e92549efc5ba.svg";

import { Tile, TileType, degToRad, findCenter, type CartesianCoordinate, type HexCoordinate } from "../engine/Tile";

import "./game-board.scss";
import "./tinc.scss";
import { Path } from "../engine/Path";
import { Intersection } from "../engine/Intersection";

const HEX_SIZE = 10 * Math.cos(degToRad(30)) * 0.995; // 10em * hex width / height * arbitrary adjustment

export const GameBoard = () => {
    const transX2 = 50;
    const transY2 = 20;
    const nodes = (
        <>
            {/*<TileHex transX={transX2} transY={transY2} tile={new Tile({ x: -1, y: 0, z: 0 }, 2, TileType.ORE)} />
            <TileHex transX={transX2} transY={transY2} tile={new Tile({ x: 0, y: 0, z: -1 }, -1, TileType.DESERT)} />
            <TileHex transX={transX2} transY={transY2} tile={new Tile({ x: 0, y: 0, z: 0 }, 4, TileType.SHEEP)} />
            <TileHex transX={transX2} transY={transY2} tile={new Tile({ x: 0, y: 0, z: 1 }, 5, TileType.WHEAT)} />
            <TileHex transX={transX2} transY={transY2} tile={new Tile({ x: 0, y: -1, z: 0 }, 6, TileType.WOOD)} />
            <TileHex transX={transX2} transY={transY2} tile={new Tile({ x: 1, y: 0, z: 0 }, 8, TileType.BRICK)} />
            <TileHex transX={transX2} transY={transY2} tile={new Tile({ x: 2, y: 0, z: 0 }, 9, TileType.ORE)} />
            <TileHex faded transX={transX2} transY={transY2} tile={new Tile({ x: 2, y: 1, z: 0 }, 10, TileType.GOLD)} />
            <TileHex transX={transX2} transY={transY2} tile={new Tile({ x: 1, y: -1, z: 0 }, 11, TileType.WHEAT)} />
            <TileHex transX={transX2} transY={transY2} tile={new Tile({ x: 0, y: 0, z: -2 }, 4, TileType.BRICK)} />
            <TileHex transX={transX2} transY={transY2} tile={new Tile({ x: -1, y: -3, z: -1 }, 5, TileType.ORE)} />
            <TileHex transX={transX2} transY={transY2} tile={new Tile({ x: -2, y: -3, z: -1 }, 4, TileType.SHEEP)} />
            <TileHex transX={transX2} transY={transY2} tile={new Tile({ x: -3, y: -3, z: -1 }, 6, TileType.BRICK)} />
            <TileHex transX={transX2} transY={transY2} tile={new Tile({ x: -1, y: 0, z: 1 }, 12, TileType.WOOD)} />
            <TileHex transX={transX2} transY={transY2} tile={new Tile({ x: -1, y: 1, z: 1 }, 5, TileType.SHEEP)} />*/}

            <TileHex transX={transX2} transY={transY2} tile={new Tile({ x: 0, y: 2, z: 1 }, 5, TileType.SHEEP)} />
            <TileHex transX={transX2} transY={transY2} tile={new Tile({ x: 0, y: 1, z: 0 }, 3, TileType.BRICK)} />
            <TileHex transX={transX2} transY={transY2} tile={new Tile({ x: 1, y: 3, z: 1 }, 11, TileType.ORE)} />
            <TileHex transX={transX2} transY={transY2} tile={new Tile({ x: -1, y: 0, z: -2 }, 12, TileType.WHEAT)} />
        </>
    );

    return (
        <>
            <div className="board-viewport">
                {nodes}
                {/*drawPath(transX2, transY2, new Path({ x: 0, y: 2, z: 1 }, { x: 0, y: 1, z: 0 }, { x: 1, y: 3, z: 1 }, { x: -1, y: 0, z: -2 }, { x: 1, y: 3, z: 1 }, { x: 0, y: 1, z: 0 }))*/}
                {drawIntersection(transX2, transY2, new Intersection({ x: 0, y: 2, z: 1 }, { x: 0, y: 1, z: 0 }, { x: 1, y: 3, z: 1 }))}
                {drawIntersection(transX2, transY2, new Intersection({ x: -1, y: 0, z: -2 }, { x: 0, y: 1, z: 0 }, { x: 1, y: 3, z: 1 }))}
            </div>
        </>
    );
};

const calculateProbabilitySprite = (num: number): string | null => {
    switch (num) {
        case 2:
            return prob2;
        case 3:
            return prob3;
        case 4:
            return prob4;
        case 5:
            return prob5;
        case 6:
            return prob6;
        case 8:
            return prob8;
        case 9:
            return prob9;
        case 10:
            return prob10;
        case 11:
            return prob11;
        case 12:
            return prob12;
    }
    return null;
};

const calculateTileSprite = (tileType: TileType): string => {
    switch (tileType) {
        case TileType.BRICK:
            return tileBrick;
        case TileType.WOOD:
            return tileLumber;
        case TileType.ORE:
            return tileOre;
        case TileType.WHEAT:
            return tileGrain;
        case TileType.SHEEP:
            return tileWool;
        case TileType.DESERT:
            return tileDesert;
        case TileType.GOLD:
            return tileGold;
    }
    return "";
};

/*
 * Converts a hex coordinate into a cartesian coordinate
 * @param hexCoordinates - the hex coordinate
 * @return the cartesian coordinate
 */
const hexToCartesianPointyUp = (hexCoordinates: HexCoordinate): CartesianCoordinate => {
    const X_UNIT_VEC: CartesianCoordinate = { x: Math.sin(degToRad(60 + 30)), y: Math.cos(degToRad(60 + 30)) };
    const Y_UNIT_VEC: CartesianCoordinate = { x: Math.sin(degToRad(180 + 30)), y: Math.cos(degToRad(180 + 30)) };
    const Z_UNIT_VEC: CartesianCoordinate = { x: Math.sin(degToRad(300 + 30)), y: Math.cos(degToRad(300 + 30)) };

    const x = X_UNIT_VEC.x * hexCoordinates.x + Y_UNIT_VEC.x * hexCoordinates.y + Z_UNIT_VEC.x * hexCoordinates.z;
    const y = X_UNIT_VEC.y * hexCoordinates.x + Y_UNIT_VEC.y * hexCoordinates.y + Z_UNIT_VEC.y * hexCoordinates.z;
    return { x: x, y: y };
};

const getTranslationStyle = (cartesianX: number, cartesianY: number) => {
    return `transform: translate(${cartesianX}em, ${cartesianY}em) translate(-50%, -50%);`;
};

const TileHex = (props: { transX: number; transY: number; tile: Tile; faded?: boolean }) => {
    const displacement = hexToCartesianPointyUp(props.tile.coordinate);
    const cartesianX = props.transX + displacement.x * HEX_SIZE;
    const cartesianY = props.transY + displacement.y * HEX_SIZE;

    const id = `tile-(${props.tile.coordinate.x},${props.tile.coordinate.y},${props.tile.coordinate.z})`;
    const style = getTranslationStyle(cartesianX, cartesianY);
    const sprite = calculateTileSprite(props.tile.tileType);
    const numberSprite = calculateProbabilitySprite(props.tile.number);
    return (
        <div className="tile" id={id} style={style}>
            <div className={"tile__hitbox"} />
            <img className={"tile__background-image" + (props.faded ? " tile__background-image--faded" : "")} src={sprite} />
            {numberSprite && <img className={"tile__probability-image"} src={numberSprite} />}
        </div>
    );
};

const drawPoint = (transX: number, transY: number, coord: HexCoordinate) => {
    const displacement = hexToCartesianPointyUp(coord);
    const x = transX + displacement.x * HEX_SIZE;
    const y = transY + displacement.y * HEX_SIZE;

    const style = getTranslationStyle(x, y);

    return (
        <>
            <div className={"point"} style={style}></div>
        </>
    );
};

const drawIntersection = (transX: number, transY: number, intersection: Intersection) => {
    return drawPoint(transX, transY, findCenter(intersection.coord1, intersection.coord2, intersection.coord3));
};

/*
const drawPath = (transX: number, transY: number, path: Path) => {
    // Force start to be leftmost intersection and end to be rightmost intersection
    const first = findCenter(path.start1, path.start2, path.start3);
    const second = findCenter(path.end1, path.end2, path.end3);
    const scale = 10;
    const ROAD_WIDTH_SCALE = 0.055;
    const ROAD_LENGTH_SCALE = 1;

    let start = first;
    let end = second;

    if (hexToCartesianPointyUp(first).x < hexToCartesianPointyUp(second).x) {
        start = first;
        end = second;
    } else {
        start = second;
        end = first;
    }

    const id = ("path-x-" + start.x + "y-" + start.y + "z-" + start.z + "-to-x-" + end.x + "y-" + end.y + "z-" + end.z).replace(/[.]/g, "_");

    // Move road to correct section of board
    const cartesianStart = hexToCartesianPointyUp(start);
    const cartesianEnd = hexToCartesianPointyUp(end);
    let x = transX + cartesianStart.x * scale + (Math.sqrt(3) * scale) / 4;
    let y = transY + cartesianStart.y * scale + scale / 4;

    const deltaX = cartesianEnd.x - cartesianStart.x;
    const deltaY = cartesianEnd.y - cartesianStart.y;

    // Find angle of road
    let angle = Math.atan(deltaY / deltaX);
    if (deltaX < 0) {
        angle = angle + Math.PI;
    }

    if (Math.abs(angle) < 0.001) {
        angle = 0.0;
    }

    // Find exact size of road div
    const length = (scale / Math.sqrt(3)) * ROAD_LENGTH_SCALE;
    const height = scale * ROAD_WIDTH_SCALE;

    // Offset road to be centered based on its angle
    x = x + 0.04 * scale;
    x = x + scale / Math.sqrt(3) - length / 2;

    if (Math.abs(angle) < 0.0001 || Math.abs(angle - Math.PI) < 0.0001 || Math.abs(angle + Math.PI) < 0.001) {
        x = x - (scale / Math.sqrt(3) - length / 2);
        x = x + ((1 - ROAD_LENGTH_SCALE) * scale) / (2 * Math.sqrt(3));
        y = y + 0.015 * scale - height / 2;
    } else if (Math.abs(angle - Math.PI / 3) < 0.0001) {
        x = x - (scale * Math.sqrt(3)) / 4;
        y = y - 0.015 * scale + scale / 4;
    } else if (Math.abs(angle + Math.PI / 3) < 0.0001) {
        x = x - (scale * Math.sqrt(3)) / 4;
        y = y - 0.015 * scale - scale / 4;
    }

    const style = `transform: translate(${x}em, ${y}em) rotate(${angle}rad); width: ${length}em; height: ${height}em;`;

    return (
        <>
            <div className="path" id={id} style={style + " background-color: red"}></div>
        </>
    );
};
*/
