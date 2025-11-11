import { Intersection } from "../engine/Intersection";
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

export const GameBoard = () => {
    const transX = 0;
    const transY = 0;
    return (
        <div className="main-wrapper">
            <div id="board-viewport" className="sea-color unselectable">
                {drawTile(transX, transY, INITIAL_HEX_SIZE, new Tile({ x: 1, y: 0, z: -1 }, 4, TileType.WOOD))}
                {drawTile(transX, transY, INITIAL_HEX_SIZE, new Tile({ x: 1, y: 0, z: 1 }, 4, TileType.ORE))}
                {drawTile(transX, transY, INITIAL_HEX_SIZE, new Tile({ x: 1, y: 0, z: 0 }, 4, TileType.SHEEP))}
                {drawTile(transX, transY, INITIAL_HEX_SIZE, new Tile({ x: 2, y: 0, z: 0 }, 5, TileType.WHEAT))}
                {drawTile(transX, transY, INITIAL_HEX_SIZE, new Tile({ x: 2, y: 0, z: -1 }, 5, TileType.BRICK))}
                {drawTile(transX, transY, INITIAL_HEX_SIZE, new Tile({ x: 3, y: 0, z: 0 }, 6, TileType.ORE))}
                {drawTile(transX, transY, INITIAL_HEX_SIZE, new Tile({ x: 1, y: -1, z: 1 }, 6, TileType.SHEEP))}
                {drawTile(transX, transY, INITIAL_HEX_SIZE, new Tile({ x: 1, y: -1, z: 0 }, 6, TileType.DESERT))}
                {drawTile(transX, transY, INITIAL_HEX_SIZE, new Tile({ x: 2, y: -1, z: 0 }, 6, TileType.BRICK))}
                {drawTile(transX, transY, INITIAL_HEX_SIZE, new Tile({ x: 1, y: -2, z: 0 }, 6, TileType.WOOD))}
                {drawIntersection(transX, transY, INITIAL_HEX_SIZE, new Intersection({ x: 1, y: -2, z: 0 }, { x: 2, y: -1, z: 0 }, { x: 1, y: -1, z: 0 }), true)}
                {drawPath(transX, transY)}
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

const drawPath = (transX: number, transY: number) => {
    return (
        <>
            <div
                className="path-select"
                id="path-x-2y-1_3333333333333333z-0_6666666666666666-to-x-2y-0_6666666666666666z-0_3333333333333333-select"
                style="transform: translate(1079.72px, 442.55px) rotate(1.0472rad);width: 71.3028px;height: 7.15px;        "
            ></div>
            <div
                className="path"
                id="path-x-2y-1_3333333333333333z-0_6666666666666666-to-x-2y-0_6666666666666666z-0_3333333333333333"
                style="transform: translate(1079.72px, 442.55px) rotate(1.0472rad);width: 71.3028px;height: 7.15px;background-color: rgb(191, 39, 32);        "
            ></div>
            <div
                className="path-select highlighted-path"
                id="path-x-0_6666666666666666y-1z-2_3333333333333335-to-x-0_6666666666666666y-1_3333333333333333z-2-select"
                style="          transform: translate(741.965px, 442.55px) rotate(-1.0472rad); width: 71.3028px; height: 7.15px;"
            ></div>
            <div className="path" id="path-x-0_6666666666666666y-1z-2_3333333333333335-to-x-0_6666666666666666y-1_3333333333333333z-2"></div>
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
