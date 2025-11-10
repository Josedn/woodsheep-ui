import { Tile, TileType, hexToCartesian } from "../engine/Tile";

const TILE_SCALE = 0.95;
const INITIAL_HEX_SIZE = 130;
const MIN_SCALE = 100;
const MAX_SCALE = 300;

export const InGame = () => {
    return (
        <div className="main-wrapper">
            <div id="board-viewport" className="sea-color unselectable">
                {drawTile(0, 0, INITIAL_HEX_SIZE, new Tile({ x: 1, y: 0, z: 0 }, 3, TileType.WOOD))}
                {drawTile(0, 0, INITIAL_HEX_SIZE, new Tile({ x: 2, y: 0, z: 0 }, 3, TileType.WHEAT))}
                {drawTile(0, 0, INITIAL_HEX_SIZE, new Tile({ x: 3, y: 0, z: 0 }, 3, TileType.ORE))}
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

    return (
        <div className="hexagon-wrapper" id={`${id}-wrapper`} style={style}>
            <div className={"hexagon " + calculateTileClassName(tile.tileType)} id={id} />
        </div>
    );
};
