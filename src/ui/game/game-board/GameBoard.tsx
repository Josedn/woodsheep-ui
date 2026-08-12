import { useState } from "preact/hooks";
import { Tile, TileType, findCenter2c, hexToCartesian, type HexCoordinate } from "../../../engine/catan/Tile";
import { computeAllEdges, computeNodePositions } from "../../../engine/catan/BoardGeometry";
import { GAME_ICONS, GAME_TINTED_ICONS, UI_ICONS } from "../../../assets/images";
import { useGameEvent } from "../../hooks/useGameEvent";
import { UI_EVENTS } from "../../../engine/ui-facade/UIFacade";
import { dispatchGameCommand } from "../../hooks/dispatchGameCommand";
import { CommandBuildCity } from "../../../engine/ui-facade/commands/game/CommandBuildCity";
import { CommandBuildRoad } from "../../../engine/ui-facade/commands/game/CommandBuildRoad";
import { CommandBuildSettlement } from "../../../engine/ui-facade/commands/game/CommandBuildSettlement";
import { GameEngine } from "../../../engine/GameEngine";
import type { GameStateData, GameStatePort, GameStateTile } from "../../../engine/GameService";
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

const colorSuffix = (color: string): string => {
    const name = color.replace(/^C\./, "").toLowerCase();
    return name.charAt(0).toUpperCase() + name.slice(1);
};

const tintedIcons: Record<string, string> = GAME_TINTED_ICONS;
const settlementSprite = (color: string) => tintedIcons[`settlement${colorSuffix(color)}`];
const citySprite = (color: string) => tintedIcons[`city${colorSuffix(color)}`];
const roadSprite = (color: string) => tintedIcons[`road${colorSuffix(color)}`];

const PORT_RESOURCE_SPRITES: Record<string, string> = {
    WOOD: GAME_ICONS.portLumber,
    BRICK: GAME_ICONS.portBrick,
    ORE: GAME_ICONS.portOre,
    SHEEP: GAME_ICONS.portWool,
    WHEAT: GAME_ICONS.portGrain,
};

const portSprite = (resource: string | null): string => (resource ? (PORT_RESOURCE_SPRITES[resource] ?? GAME_ICONS.port) : GAME_ICONS.port);

/** Offset (relative to the port's own hex) of the neighboring land tile the pier faces, mirroring
 * the backend's Coordinate.UNIT_VECTORS so the pier rotation matches the port's real direction. */
const PORT_DIRECTION_OFFSETS: Record<string, HexCoordinate> = {
    EAST: { x: 1, y: -1, z: 0 },
    SOUTHEAST: { x: 0, y: -1, z: 1 },
    SOUTHWEST: { x: -1, y: 0, z: 1 },
    WEST: { x: -1, y: 1, z: 0 },
    NORTHWEST: { x: 0, y: 1, z: -1 },
    NORTHEAST: { x: 1, y: 0, z: -1 },
};

const portAngle = (direction: string): number => {
    const offset = PORT_DIRECTION_OFFSETS[direction];
    if (!offset) return 0;
    const cartesian = hexToCartesian(offset);
    return Math.atan2(cartesian.y, cartesian.x);
};

export const GameBoard = () => {
    const transX2 = 40;
    const transY2 = 28;

    const [gameState, setGameState] = useState<GameStateData>(() => GameEngine.getGame().gameService.gameStateData);

    useGameEvent(UI_EVENTS.GAME_STATE_UPDATED, data => setGameState(data));

    const tiles = gameStateTilesToTiles(gameState.tiles);
    const nodePositions = computeNodePositions(gameState.tiles);
    const allEdges = computeAllEdges(gameState.tiles);

    const isYourTurn = gameState.currentColor != null && gameState.currentColor === gameState.yourColor;
    const canBuildSettlement = isYourTurn && gameState.playableActionTypes.includes("AT.BUILD_SETTLEMENT");
    const canBuildCity = isYourTurn && gameState.playableActionTypes.includes("AT.BUILD_CITY");
    const canBuildRoad = isYourTurn && gameState.playableActionTypes.includes("AT.BUILD_ROAD");

    const buildableSettlementIds = new Set(gameState.buildableSettlementNodeIds);
    const buildableCityIds = new Set(gameState.buildableCityNodeIds);
    const buildableRoadKeys = new Set(gameState.buildableRoadEdges.map(e => `${Math.min(e.nodeA, e.nodeB)}-${Math.max(e.nodeA, e.nodeB)}`));

    return (
        <>
            <div className="board-viewport">
                {tiles.map(tile => (
                    <TileHex key={`${tile.coordinate.x},${tile.coordinate.y},${tile.coordinate.z}`} transX={transX2} transY={transY2} tile={tile} />
                ))}

                {gameState.ports.map(port => (
                    <PortEntity key={`port-${port.id}`} transX={transX2} transY={transY2} port={port} />
                ))}

                {allEdges.map(([a, b]) => {
                    const posA = nodePositions.get(a);
                    const posB = nodePositions.get(b);
                    if (!posA || !posB) return null;
                    const road = gameState.roads.find(r => (r.nodeA === a && r.nodeB === b) || (r.nodeA === b && r.nodeB === a));
                    if (road) {
                        return <RoadEntity key={`road-${a}-${b}`} transX={transX2} transY={transY2} start={posA} end={posB} sprite={roadSprite(road.color)} />;
                    }
                    if (canBuildRoad && buildableRoadKeys.has(`${Math.min(a, b)}-${Math.max(a, b)}`)) {
                        return <RoadEntity key={`road-buildable-${a}-${b}`} transX={transX2} transY={transY2} start={posA} end={posB} buildable onClick={() => dispatchGameCommand(new CommandBuildRoad(a, b))} />;
                    }
                    return null;
                })}

                {Array.from(nodePositions.entries()).map(([nodeId, pos]) => {
                    const building = gameState.buildings.find(b => b.nodeId === nodeId);
                    if (building) {
                        const sprite = building.type === "CITY" ? citySprite(building.color) : settlementSprite(building.color);
                        return <NodeEntity key={`building-${nodeId}`} transX={transX2} transY={transY2} coord={pos} sprite={sprite} />;
                    }
                    if (canBuildCity && buildableCityIds.has(nodeId)) {
                        return <NodeEntity key={`city-buildable-${nodeId}`} transX={transX2} transY={transY2} coord={pos} sprite={UI_ICONS.iconCross} onClick={() => dispatchGameCommand(new CommandBuildCity(nodeId))} />;
                    }
                    if (canBuildSettlement && buildableSettlementIds.has(nodeId)) {
                        return <NodePoint key={`settlement-buildable-${nodeId}`} transX={transX2} transY={transY2} coord={pos} onClick={() => dispatchGameCommand(new CommandBuildSettlement(nodeId))} />;
                    }
                    return null;
                })}
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

const PortEntity = (props: { transX: number; transY: number; port: GameStatePort }) => {
    const coord: HexCoordinate = { x: props.port.q, y: props.port.r, z: props.port.s };
    const angle = portAngle(props.port.direction) - 60 * (Math.PI / 180);
    const style = getTranslationStyle(props.transX, props.transY, coord, angle);
    const styleNoRotation = getTranslationStyle(props.transX, props.transY, coord);
    const id = `port-(${coord.x},${coord.y},${coord.z})`;

    return (
        <>
            <div className="port-pier" id={id} style={style}>
                <img className="port-pier__image1" src={GAME_ICONS.portPier} />
                <img className="port-pier__image2" src={GAME_ICONS.portPier} />
            </div>
            <div className="port-ship" style={styleNoRotation}>
                <img className="port-ship__image" src={portSprite(props.port.resource)} />
            </div>
        </>
    );
};

/** A settlement/city sprite, or (with `onClick` and no matching building) a clickable buildable spot. */
const NodeEntity = (props: { transX: number; transY: number; coord: HexCoordinate; sprite: string; onClick?: () => void }) => {
    const style = getTranslationStyle(props.transX, props.transY, props.coord);
    const id = `entity-(${props.coord.x},${props.coord.y},${props.coord.z})`;
    return (
        <div id={id} className={"entity"} style={style} onClick={props.onClick}>
            <img className="entity__image" src={props.sprite} />
        </div>
    );
};

/** A plain highlighted dot marking a buildable (empty) settlement spot. */
const NodePoint = (props: { transX: number; transY: number; coord: HexCoordinate; onClick: () => void }) => {
    const style = getTranslationStyle(props.transX, props.transY, props.coord);
    const id = `point-(${props.coord.x},${props.coord.y},${props.coord.z})`;
    return <div id={id} className={"point"} style={style} onClick={props.onClick}></div>;
};

/** A road sprite between two node positions, or (with `buildable`) a clickable highlighted edge. */
const RoadEntity = (props: { transX: number; transY: number; start: HexCoordinate; end: HexCoordinate; sprite?: string; buildable?: boolean; onClick?: () => void }) => {
    const center = findCenter2c(props.start, props.end);
    const cartesianStart = hexToCartesian(props.start);
    const cartesianEnd = hexToCartesian(props.end);
    const deltaX = cartesianEnd.x - cartesianStart.x;
    const deltaY = cartesianEnd.y - cartesianStart.y;
    const angle = Math.atan(deltaY / deltaX) + Math.PI / 2;
    const style = getTranslationStyle(props.transX, props.transY, center, angle);
    const id = `path-(${center.x},${center.y},${center.z})`;

    return (
        <div className={"path-road" + (props.buildable ? " path-road--buildable" : "")} id={id} style={style} onClick={props.onClick}>
            {props.sprite && <img className="path-road__image" src={props.sprite} />}
        </div>
    );
};
