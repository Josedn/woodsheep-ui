import { Tile, TileType, hexToCartesian } from "../engine/Tile";

const TILE_SCALE = 0.95;
const INITIAL_HEX_SIZE = 130;
const MIN_SCALE = 100;
const MAX_SCALE = 300;

export const InGame = () => {
    const transX = 700;
    const transY = 250;
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
