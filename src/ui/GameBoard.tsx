import { Intersection } from "../engine/Intersection";
import { Path } from "../engine/Path";
import { Tile, TileType, findCenter, hexToCartesian } from "../engine/Tile";

const TILE_SCALE = 0.95;
const INITIAL_HEX_SIZE = 130;
const MIN_SCALE = 100;
const MAX_SCALE = 300;

const SETTLEMENT_SCALE = 0.2;
const CITY_SCALE = 0.25;
const SELECTABLE_AREA_SCALE = 0.25;
const SETTLEMENT_SVG_WIDTH = 16;
const CITY_SVG_WIDTH = 100;

const ROAD_WIDTH_SCALE = 0.055;
const ROAD_LENGTH_SCALE = 0.95;

export const GameBoard = () => {
    const transX = 700;
    const transY = 250;
    return (
        <div className="main-wrapper">
            <div id="board-viewport" className="sea-color unselectable">
                {drawTile(transX, transY, INITIAL_HEX_SIZE, new Tile({ x: 1, y: 0, z: -1 }, 8, TileType.WOOD))}
                {drawTile(transX, transY, INITIAL_HEX_SIZE, new Tile({ x: 1, y: 0, z: 1 }, 4, TileType.ORE))}
                {drawTile(transX, transY, INITIAL_HEX_SIZE, new Tile({ x: 1, y: 0, z: 0 }, 10, TileType.SHEEP))}
                {drawTile(transX, transY, INITIAL_HEX_SIZE, new Tile({ x: 2, y: 0, z: 0 }, 5, TileType.WHEAT))}
                {drawTile(transX, transY, INITIAL_HEX_SIZE, new Tile({ x: 2, y: 0, z: -1 }, 5, TileType.BRICK))}
                {drawTile(transX, transY, INITIAL_HEX_SIZE, new Tile({ x: 3, y: 0, z: 0 }, 6, TileType.ORE))}
                {drawTile(transX, transY, INITIAL_HEX_SIZE, new Tile({ x: 1, y: -1, z: 1 }, 6, TileType.SHEEP))}
                {drawTile(transX, transY, INITIAL_HEX_SIZE, new Tile({ x: 1, y: -1, z: 0 }, 2, TileType.DESERT))}
                {drawTile(transX, transY, INITIAL_HEX_SIZE, new Tile({ x: 2, y: -1, z: 0 }, 12, TileType.BRICK))}
                {drawTile(transX, transY, INITIAL_HEX_SIZE, new Tile({ x: 1, y: -2, z: 0 }, 3, TileType.WOOD))}

                {drawIntersection(transX, transY, INITIAL_HEX_SIZE, new Intersection({ x: 1, y: -2, z: 0 }, { x: 2, y: -1, z: 0 }, { x: 1, y: -1, z: 0 }), true)}
                {drawIntersection(transX, transY, INITIAL_HEX_SIZE, new Intersection({ x: 2, y: 0, z: 0 }, { x: 2, y: -1, z: 0 }, { x: 1, y: -1, z: 0 }), true)}

                {drawPath(transX, transY, INITIAL_HEX_SIZE, new Path({ x: 1, y: -2, z: 0 }, { x: 2, y: -1, z: 0 }, { x: 1, y: -1, z: 0 }, { x: 2, y: 0, z: 0 }, { x: 2, y: -1, z: 0 }, { x: 1, y: -1, z: 0 }), false)}
                {drawPath(transX, transY, INITIAL_HEX_SIZE, new Path({ x: 2, y: 0, z: 0 }, { x: 3, y: 0, z: 0 }, { x: 2, y: -1, z: 0 }, { x: 2, y: 0, z: 0 }, { x: 2, y: -1, z: 0 }, { x: 1, y: -1, z: 0 }), false)}

                {drawPath(transX, transY, INITIAL_HEX_SIZE, new Path({ x: 1, y: 0, z: 1 }, { x: 1, y: -1, z: 0 }, { x: 1, y: -1, z: 1 }, { x: 1, y: 0, z: 1 }, { x: 1, y: -1, z: 0 }, { x: 1, y: 0, z: 0 }), true)}
            </div>
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

const drawPath = (transX: number, transY: number, scale: number, path: Path, highlighted: boolean) => {
    // Force start to be leftmost intersection and end to be rightmost intersection
    const first = findCenter(path.start1, path.start2, path.start3);
    const second = findCenter(path.end1, path.end2, path.end3);

    let start = first;
    let end = second;

    if (hexToCartesian(first).x < hexToCartesian(second).x) {
        start = first;
        end = second;
    } else {
        start = second;
        end = first;
    }

    const id = ("path-x-" + start.x + "y-" + start.y + "z-" + start.z + "-to-x-" + end.x + "y-" + end.y + "z-" + end.z).replace(/[.]/g, "_");

    // Move road to correct section of board
    var cartesianStart = hexToCartesian(start);
    var cartesianEnd = hexToCartesian(end);
    var x = transX + cartesianStart.x * scale + (Math.sqrt(3) * scale) / 4;
    var y = transY + cartesianStart.y * scale + scale / 4;

    var deltaX = cartesianEnd.x - cartesianStart.x;
    var deltaY = cartesianEnd.y - cartesianStart.y;

    // Find angle of road
    var angle = Math.atan(deltaY / deltaX);
    if (deltaX < 0) {
        angle = angle + Math.PI;
    }

    if (Math.abs(angle) < 0.001) {
        angle = 0.0;
    }

    // Find exact size of road div
    var length = (scale / Math.sqrt(3)) * ROAD_LENGTH_SCALE;
    var height = scale * ROAD_WIDTH_SCALE;

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

    const style = `transform: translate(${x}px, ${y}px) rotate(${angle}rad); width: ${length}px; height: ${height}px;`;

    return (
        <>
            <div className={"path-select" + (highlighted ? " highlighted-path" : "")} id={`${id}-select`} style={style}></div>
            <div className="path" id={id} style={style + (highlighted ? "" : " background-color: red")}></div>
        </>
    );
};

const drawIntersection = (transX: number, transY: number, scale: number, intersection: Intersection, highlighted: boolean) => {
    const hexCoordinate = findCenter(intersection.coord1, intersection.coord2, intersection.coord3);
    const id = `intersection-x-${hexCoordinate.x}y-${hexCoordinate.y}z-${hexCoordinate.z}`.replace(/[.]/g, "_");
    const displacement = hexToCartesian(hexCoordinate);

    var width = scale * SELECTABLE_AREA_SCALE;
    var x = transX + displacement.x * scale + (Math.sqrt(3) * scale) / 4 - width / 4 - 0.02 * scale;
    var y = transY + displacement.y * scale + scale / 4 - width / 2;

    const style = `transform: translate(${x}px, ${y}px); width: ${width}px; height: ${width}px;`;

    return (
        <>
            <div className={"intersection-select circle" + (highlighted ? " highlighted" : "")} id={`${id}-select`} style={style}></div>
            <div className="intersection" id={id}></div>
        </>
    );
};

const drawTile = (transX: number, transY: number, scale: number, tile: Tile) => {
    const hexCoordinate = tile.coordinate;
    const displacement = hexToCartesian(tile.coordinate);
    const tileX = transX + displacement.x * scale;
    const tileY = transY + displacement.y * scale - (scale * (1 - 1 / Math.sqrt(3))) / 2;
    const width = TILE_SCALE * scale;

    const id = `tile-x-${hexCoordinate.x}y-${hexCoordinate.y}z-${hexCoordinate.z}`;
    const style = `transform: translate(${tileX}px, ${tileY}px); width: ${width}px; height: ${width}px;`;
    const number = tile.number;
    const numDots = 6 - Math.abs(number - 7);

    const isRedNumber = number == 6 || number == 8;

    const dots = [];
    for (let i = 0; i < numDots; i++) {
        dots.push(<div key={i} className={"circle number-dot" + (isRedNumber ? " red-number-dot" : "")} style="height: 3.25px; width: 3.25px; margin-right: 1.08333px;"></div>);
    }

    return (
        <div className="hexagon-wrapper" id={`${id}-wrapper`} style={style}>
            <div className={"hexagon " + calculateTileClassName(tile.tileType)} id={id} />
            <div className="circle number-circle number-circle-color" style="transform: translate(43.55px, -84.5px); width: 39px; height: 39px; font-size: 22.75px;">
                <span className={"unselectable" + (isRedNumber ? " red-number" : "")} style="line-height: 39px;">
                    {number}
                </span>
                <br />
                <div className="dots-container" style="transform: translate(0px, -29.25px);">
                    {dots}
                </div>
            </div>
        </div>
    );
};
