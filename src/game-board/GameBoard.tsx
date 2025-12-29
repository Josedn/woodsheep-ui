import tileLumber from "../assets/game/tile_lumber.2f0099b519514f091763.svg";
import { Tile, TileType, hexToCartesian, type CartesianCoordinate, type HexCoordinate } from "../engine/Tile";

import "./game-board.scss";
import "./tinc.scss";

const TILE_SCALE = 0.95;

export const GameBoard = () => {
    const transX = 350;
    const transY = 250;
    const transX2 = 1100;
    const transY2 = 250;
    const INITIAL_HEX_SIZE = 180;

    return (
        <div className="board-viewport">
            {drawTileOld(transX, transY, INITIAL_HEX_SIZE, new Tile({ x: -1, y: 0, z: 0 }, 8, TileType.ORE))}
            {drawTileOld(transX, transY, INITIAL_HEX_SIZE, new Tile({ x: 0, y: 1, z: 0 }, 8, TileType.BRICK))}
            {drawTileOld(transX, transY, INITIAL_HEX_SIZE, new Tile({ x: 0, y: 0, z: -1 }, 8, TileType.DESERT))}
            {drawTileOld(transX, transY, INITIAL_HEX_SIZE, new Tile({ x: 0, y: 0, z: 0 }, 8, TileType.SHEEP))}
            {drawTileOld(transX, transY, INITIAL_HEX_SIZE, new Tile({ x: 0, y: 0, z: 1 }, 8, TileType.WHEAT))}
            {drawTileOld(transX, transY, INITIAL_HEX_SIZE, new Tile({ x: 0, y: -1, z: 0 }, 8, TileType.WOOD))}
            {drawTileOld(transX, transY, INITIAL_HEX_SIZE, new Tile({ x: 1, y: 0, z: 0 }, 8, TileType.BRICK))}

            {drawTile(transX2, transY2, INITIAL_HEX_SIZE, new Tile({ x: -1, y: 0, z: 0 }, 8, TileType.ORE))}
            {drawTile(transX2, transY2, INITIAL_HEX_SIZE, new Tile({ x: 0, y: 1, z: 0 }, 8, TileType.BRICK))}
            {drawTile(transX2, transY2, INITIAL_HEX_SIZE, new Tile({ x: 0, y: 0, z: -1 }, 8, TileType.DESERT))}
            {drawTile(transX2, transY2, INITIAL_HEX_SIZE, new Tile({ x: 0, y: 0, z: 0 }, 8, TileType.SHEEP))}
            {drawTile(transX2, transY2, INITIAL_HEX_SIZE, new Tile({ x: 0, y: 0, z: 1 }, 8, TileType.WHEAT))}
            {drawTile(transX2, transY2, INITIAL_HEX_SIZE, new Tile({ x: 0, y: -1, z: 0 }, 8, TileType.WOOD))}
            {drawTile(transX2, transY2, INITIAL_HEX_SIZE, new Tile({ x: 1, y: 0, z: 0 }, 8, TileType.BRICK))}
        </div>
    );
};

const calculateTileClassName = (tileType: TileType): string => {
    switch (tileType) {
        case TileType.BRICK:
            return "brick-color";
        case TileType.WOOD:
            return "wood-color";
        case TileType.ORE:
            return "ore-color";
        case TileType.WHEAT:
            return "wheat-color";
        case TileType.SHEEP:
            return "sheep-color";
        case TileType.DESERT:
            return "desert-color";
    }
    return "";
};

const drawTileOld = (transX: number, transY: number, scale: number, tile: Tile) => {
    const hexCoordinate = tile.coordinate;
    const displacement = hexToCartesianFlatHead(tile.coordinate);
    const tileX = transX + displacement.x * scale;
    const tileY = transY + displacement.y * scale - (scale * (1 - 1 / Math.sqrt(3))) / 2;
    const width = TILE_SCALE * scale;

    const id = `tile-x-${hexCoordinate.x}y-${hexCoordinate.y}z-${hexCoordinate.z}`;
    const style = `transform: translate(${tileX}px, ${tileY}px); width: ${width}px; height: ${width}px;`;

    return (
        <div className="tile" id={`${id}-wrapper`} style={style}>
            <div className={"hexagon " + calculateTileClassName(tile.tileType)} id={id} />
            <div className="circle number-circle" style="transform: translate(43.55px, -84.5px); width: 39px; height: 39px; font-size: 22.75px;">
                <span style="line-height: 39px;">{`${hexCoordinate.x},${hexCoordinate.y},${hexCoordinate.z}`}</span>
            </div>
            {/*<img className={"tile__background-image"} src={tileLumber}/>
            <div className={"tile__hitbox"} />*/}
        </div>
    );
};

const degToRad = (degrees: number): number => {
    return degrees * (Math.PI / 180);
};

/*
 * Converts a hex coordinate into a cartesian coordinate
 * @param hexCoordinates - the hex coordinate
 * @return the cartesian coordinate
 */
export const hexToCartesianPointyUp = (hexCoordinates: HexCoordinate): CartesianCoordinate => {
    const X_UNIT_VEC: CartesianCoordinate = { x: Math.sin(degToRad(60 + 30)), y: Math.cos(degToRad(60 + 30)) };
    const Y_UNIT_VEC: CartesianCoordinate = { x: Math.sin(degToRad(180 + 30)), y: Math.cos(degToRad(180 + 30)) };
    const Z_UNIT_VEC: CartesianCoordinate = { x: Math.sin(degToRad(300 + 30)), y: Math.cos(degToRad(300 + 30)) };

    const x = X_UNIT_VEC.x * hexCoordinates.x + Y_UNIT_VEC.x * hexCoordinates.y + Z_UNIT_VEC.x * hexCoordinates.z;
    const y = X_UNIT_VEC.y * hexCoordinates.x + Y_UNIT_VEC.y * hexCoordinates.y + Z_UNIT_VEC.y * hexCoordinates.z;
    return { x: x, y: y };
};

/*
 * Converts a hex coordinate into a cartesian coordinate
 * @param hexCoordinates - the hex coordinate
 * @return the cartesian coordinate
 */
export const hexToCartesianFlatHead = (hexCoordinates: HexCoordinate): CartesianCoordinate => {
    //const X_UNIT_VEC: CartesianCoordinate = { x: Math.sin(Math.PI / 3), y: Math.cos(Math.PI / 3) };
    //const Y_UNIT_VEC: CartesianCoordinate = { x: Math.sin(Math.PI), y: Math.cos(Math.PI) };
    //const Z_UNIT_VEC: CartesianCoordinate = { x: Math.sin(-Math.PI / 3), y: Math.cos(-Math.PI / 3) };
    const X_UNIT_VEC: CartesianCoordinate = { x: Math.sin(degToRad(60)), y: Math.cos(degToRad(60)) };
    const Y_UNIT_VEC: CartesianCoordinate = { x: Math.sin(degToRad(180)), y: Math.cos(degToRad(180)) };
    const Z_UNIT_VEC: CartesianCoordinate = { x: Math.sin(degToRad(300)), y: Math.cos(degToRad(300)) };

    const x = X_UNIT_VEC.x * hexCoordinates.x + Y_UNIT_VEC.x * hexCoordinates.y + Z_UNIT_VEC.x * hexCoordinates.z;
    const y = X_UNIT_VEC.y * hexCoordinates.x + Y_UNIT_VEC.y * hexCoordinates.y + Z_UNIT_VEC.y * hexCoordinates.z;
    return { x: x, y: y };
};

const drawTile = (transX: number, transY: number, scale: number, tile: Tile) => {
    const hexCoordinate = tile.coordinate;
    const displacement = hexToCartesianPointyUp(tile.coordinate);
    const tileX = transX + displacement.x * scale;
    const tileY = transY + displacement.y * scale - (scale * (1 - 1 / Math.sqrt(3))) / 2;
    const width = TILE_SCALE * scale;

    const id = `tile-x-${hexCoordinate.x}y-${hexCoordinate.y}z-${hexCoordinate.z}`;
    const style = `transform: translate(${tileX}px, ${tileY}px); width: ${width}px; height: ${width}px;`;

    return (
        <div className="tile" id={`${id}-wrapper`} style={style}>
            <div className={"tile__hitbox " + calculateTileClassName(tile.tileType)} id={id} />
            <div className="circle number-circle" style="transform: translate(43.55px, 43.5px); width: 39px; height: 39px; font-size: 22.75px;">
                <span style="line-height: 39px;">{`${hexCoordinate.x},${hexCoordinate.y},${hexCoordinate.z}`}</span>
            </div>
            {/*<img className={"tile__background-image"} src={tileLumber}/>
            <div className={"tile__hitbox"} />*/}
        </div>
    );
};
