import { useState } from "preact/hooks";
import { Tile, TileType, degToRad, findCenter, findCenter2c, hexToCartesian, type CartesianCoordinate, type HexCoordinate } from "../../../engine/catan/Tile";
import { Path } from "../../../engine/catan/Path";
import { Intersection } from "../../../engine/catan/Intersection";
import { GAME_ICONS, GAME_TINTED_ICONS } from "../../../assets/images";
import { useGameEvent } from "../../hooks/useGameEvent";
import { UI_EVENTS } from "../../../engine/ui-facade/UIFacade";
import { GameEngine } from "../../../engine/GameEngine";
import type { GameStateTile } from "../../../engine/GameService";
import "./game-board.scss";

const HEX_SCALE = 5 * 0.99; // 10em * hex width / height * arbitrary adjustment

const tileTypeFromResource = (resource: string): TileType => {
    switch (resource) {
        case "BRICK":
            return TileType.BRICK;
        case "WOOD":
            return TileType.WOOD;
        case "ORE":
            return TileType.ORE;
        case "WHEAT":
            return TileType.WHEAT;
        case "SHEEP":
            return TileType.SHEEP;
        case "NONE":
            return TileType.DESERT;
        case "GOLD":
            return TileType.GOLD;
        default:
            return TileType.DESERT;
    }
};

const gameStateTilesToTiles = (stateTiles: GameStateTile[]): Tile[] => stateTiles.map(t => new Tile({ x: t.q, y: t.r, z: t.s }, t.number, tileTypeFromResource(t.resource)));

export const GameBoard = () => {
    const transX2 = 40;
    const transY2 = 28;

    const [tiles, setTiles] = useState<Tile[]>(() => gameStateTilesToTiles(GameEngine.getGame().gameService.gameStateData.tiles));

    useGameEvent(UI_EVENTS.GAME_STATE_UPDATED, ({ tiles: stateTiles }) => {
        setTiles(gameStateTilesToTiles(stateTiles));
    });

    return (
        <>
            <div className="board-viewport">
                {tiles.map(tile => (
                    <TileHex key={`${tile.coordinate.x},${tile.coordinate.y},${tile.coordinate.z}`} transX={transX2} transY={transY2} tile={tile} />
                ))}
            </div>
        </>
    );
};

const calculateProbabilitySprite = (num: number): string | null => {
    switch (num) {
        case 2:
            return GAME_ICONS.prob2;
        case 3:
            return GAME_ICONS.prob3;
        case 4:
            return GAME_ICONS.prob4;
        case 5:
            return GAME_ICONS.prob5;
        case 6:
            return GAME_ICONS.prob6;
        case 8:
            return GAME_ICONS.prob8;
        case 9:
            return GAME_ICONS.prob9;
        case 10:
            return GAME_ICONS.prob10;
        case 11:
            return GAME_ICONS.prob11;
        case 12:
            return GAME_ICONS.prob12;
    }
    return null;
};

const calculateTileSprite = (tileType: TileType): string => {
    switch (tileType) {
        case TileType.BRICK:
            return GAME_ICONS.tileBrick;
        case TileType.WOOD:
            return GAME_ICONS.tileLumber;
        case TileType.ORE:
            return GAME_ICONS.tileOre;
        case TileType.WHEAT:
            return GAME_ICONS.tileGrain;
        case TileType.SHEEP:
            return GAME_ICONS.tileWool;
        case TileType.DESERT:
            return GAME_ICONS.tileDesert;
        case TileType.GOLD:
            return GAME_ICONS.tileGold;
    }
    return "";
};

const getTranslationStyle = (transX: number, transY: number, coord: HexCoordinate, angle?: number) => {
    const displacement = hexToCartesian(coord);
    const cartesianX = transX + displacement.x * HEX_SCALE;
    const cartesianY = transY + displacement.y * HEX_SCALE;
    const rotation = angle ? `rotateZ(${angle}rad)` : "";
    return `transform: translate(${cartesianX}em, ${cartesianY}em) translate(-50%, -50%) ${rotation};`;
};

const TileHex = (props: { transX: number; transY: number; tile: Tile; faded?: boolean }) => {
    const id = `tile-(${props.tile.coordinate.x},${props.tile.coordinate.y},${props.tile.coordinate.z})`;
    const style = getTranslationStyle(props.transX, props.transY, props.tile.coordinate);
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

const TileShore = (props: { transX: number; transY: number; coord: HexCoordinate; degreesRotation: number; sprite: string }) => {
    const id = `shore-(${props.coord.x},${props.coord.y},${props.coord.z})`;
    const style = getTranslationStyle(props.transX, props.transY, props.coord, degToRad(props.degreesRotation));
    return (
        <div className="tile" id={id} style={style}>
            <div className={"tile__hitbox"} />
            <img className={"tile__background-image"} src={props.sprite} />
        </div>
    );
};

const PortPier = (props: { transX: number; transY: number; coord: HexCoordinate; angle: number; sprite: string }) => {
    const style = getTranslationStyle(props.transX, props.transY, props.coord, degToRad(props.angle));
    const styleNoRotation = getTranslationStyle(props.transX, props.transY, props.coord);
    const id = `port-(${props.coord.x},${props.coord.y},${props.coord.z})`;

    return (
        <>
            <div className="port-pier" id={id} style={style}>
                <img className={"port-pier__image1"} src={GAME_ICONS.portPier} />
                <img className={"port-pier__image2"} src={GAME_ICONS.portPier} />
            </div>
            <div className="port-ship" style={styleNoRotation}>
                <img className={"port-ship__image"} src={props.sprite} />
            </div>
        </>
    );
};

const drawPoint = (transX: number, transY: number, coord: HexCoordinate) => {
    const style = getTranslationStyle(transX, transY, coord);
    const id = `point-(${coord.x},${coord.y},${coord.z})`;
    return <div id={id} className={"point"} style={style}></div>;
};

const drawIntersection = (transX: number, transY: number, intersection: Intersection) => {
    return drawPoint(transX, transY, findCenter(intersection.coord1, intersection.coord2, intersection.coord3));
};

const drawEntity = (transX: number, transY: number, intersection: Intersection, entitySrc: string) => {
    const coord = findCenter(intersection.coord1, intersection.coord2, intersection.coord3);
    const style = getTranslationStyle(transX, transY, coord);
    const id = `entity-(${coord.x},${coord.y},${coord.z})`;
    return (
        <div id={id} className={"entity"} style={style}>
            <img className="entity__image" src={entitySrc} />
        </div>
    );
};

const drawPath = (transX: number, transY: number, path: Path, sprite: string) => {
    const start = findCenter(path.start1, path.start2, path.start3);
    const end = findCenter(path.end1, path.end2, path.end3);
    const center = findCenter2c(start, end);

    const cartesianStart = hexToCartesian(start);
    const cartesianEnd = hexToCartesian(end);
    const deltaX = cartesianEnd.x - cartesianStart.x;
    const deltaY = cartesianEnd.y - cartesianStart.y;
    const angle = Math.atan(deltaY / deltaX) + Math.PI / 2;

    const style = getTranslationStyle(transX, transY, center, angle);

    const id = `path-(${center.x},${center.y},${center.z})`;

    return (
        <div className="path-road" id={id} style={style}>
            <img className="path-road__image" src={sprite} />
        </div>
    );
};
