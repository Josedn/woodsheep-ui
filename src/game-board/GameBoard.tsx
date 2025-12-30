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
import roadRed from "../assets/game/road_red.41c6cbd9278108542715.svg";
import settlementRed from "../assets/game/settlement_red.22949197b57f9cfd968b.svg";
import cityRed from "../assets/game/city_red.991ae0c7a0b95da9811d.svg";
import tileShore1 from "../assets/game/tile_shore_1.png";
import tileShore2 from "../assets/game/tile_shore_2_sswwww.png";
import port from "../assets/game/port.png";
import portPier from "../assets/game/port_pier.png";
import portLumber from "../assets/game/port_lumber.png";
import portBrick from "../assets/game/port_brick.png";
import portOre from "../assets/game/port_ore.png";
import portWool from "../assets/game/port_wool.png";
import portGrain from "../assets/game/port_grain.png";

import { Tile, TileType, degToRad, findCenter, findCenter2c, type CartesianCoordinate, type HexCoordinate } from "../engine/Tile";

import "./game-board.scss";
import "./tinc.scss";
import { Path } from "../engine/Path";
import { Intersection } from "../engine/Intersection";

const HEX_SCALE = 10 * Math.cos(degToRad(30)) * 0.99; // 10em * hex width / height * arbitrary adjustment

export const GameBoard = () => {
    const transX2 = 49;
    const transY2 = 28;

    return (
        <>
            <div className="board-viewport">
                <TileHex transX={transX2} transY={transY2} tile={new Tile({ x: -1, y: 0, z: 0 }, 2, TileType.ORE)} />
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
                <TileHex transX={transX2} transY={transY2} tile={new Tile({ x: -1, y: 1, z: 1 }, 5, TileType.SHEEP)} />
                <TileHex transX={transX2} transY={transY2} tile={new Tile({ x: 0, y: 2, z: 1 }, 2, TileType.SHEEP)} />
                <TileHex transX={transX2} transY={transY2} tile={new Tile({ x: 0, y: 1, z: 0 }, 3, TileType.BRICK)} />
                <TileHex transX={transX2} transY={transY2} tile={new Tile({ x: 1, y: 3, z: 1 }, 11, TileType.ORE)} />
                <TileHex transX={transX2} transY={transY2} tile={new Tile({ x: -1, y: 0, z: -2 }, 12, TileType.WHEAT)} />

                <TileShore transX={transX2} transY={transY2} degreesRotation={120} sprite={tileShore2} coord={{ x: -1, y: 1, z: -2 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={120} sprite={tileShore1} coord={{ x: -2, y: 1, z: -2 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={60} sprite={tileShore2} coord={{ x: -2, y: 1, z: -1 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={60} sprite={tileShore2} coord={{ x: -3, y: 0, z: -1 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={60} sprite={tileShore1} coord={{ x: -4, y: -1, z: -1 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={0} sprite={tileShore2} coord={{ x: -4, y: -2, z: -1 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={0} sprite={tileShore2} coord={{ x: -4, y: -3, z: -1 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={0} sprite={tileShore1} coord={{ x: -4, y: -4, z: -1 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={300} sprite={tileShore2} coord={{ x: -3, y: -4, z: -1 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={300} sprite={tileShore2} coord={{ x: -2, y: -4, z: -1 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={300} sprite={tileShore1} coord={{ x: -1, y: -4, z: -1 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={240} sprite={tileShore2} coord={{ x: -0, y: -3, z: -1 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={240} sprite={tileShore2} coord={{ x: 1, y: -2, z: -1 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={240} sprite={tileShore1} coord={{ x: 2, y: -1, z: -1 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={180} sprite={tileShore2} coord={{ x: 2, y: 0, z: -1 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={180} sprite={tileShore2} coord={{ x: 2, y: 1, z: -1 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={180} sprite={tileShore1} coord={{ x: 2, y: 2, z: -1 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={120} sprite={tileShore2} coord={{ x: 1, y: 2, z: -1 }} />

                <PortPier transX={transX2} transY={transY2} coord={{ x: -2, y: 1, z: -2 }} angle={0} sprite={portLumber} />
                <PortPier transX={transX2} transY={transY2} coord={{ x: -3, y: 0, z: -1 }} angle={300} sprite={port} />
                <PortPier transX={transX2} transY={transY2} coord={{ x: -4, y: -2, z: -1 }} angle={300} sprite={portBrick} />
                <PortPier transX={transX2} transY={transY2} coord={{ x: -4, y: -4, z: -1 }} angle={240} sprite={port} />
                <PortPier transX={transX2} transY={transY2} coord={{ x: -2, y: -4, z: -1 }} angle={180} sprite={portGrain} />
                <PortPier transX={transX2} transY={transY2} coord={{ x: -0, y: -3, z: -1 }} angle={180} sprite={port} />
                <PortPier transX={transX2} transY={transY2} coord={{ x: 2, y: -1, z: -1 }} angle={120} sprite={portWool} />
                <PortPier transX={transX2} transY={transY2} coord={{ x: 2, y: 1, z: -1 }} angle={60} sprite={port} />
                <PortPier transX={transX2} transY={transY2} coord={{ x: 1, y: 2, z: -1 }} angle={60} sprite={portOre} />

                {drawPath(transX2, transY2, new Path({ x: 0, y: 2, z: 1 }, { x: 0, y: 1, z: 0 }, { x: 1, y: 3, z: 1 }, { x: -1, y: 0, z: -2 }, { x: 0, y: 1, z: 0 }, { x: 1, y: 3, z: 1 }))}
                {drawPath(transX2, transY2, new Path({ x: 0, y: 2, z: 1 }, { x: 0, y: 1, z: 0 }, { x: 1, y: 3, z: 1 }, { x: 0, y: 2, z: 1 }, { x: 0, y: 1, z: 0 }, { x: -1, y: 0, z: 0 }))}
                {drawPath(transX2, transY2, new Path({ x: 0, y: 2, z: 1 }, { x: -1, y: 0, z: 0 }, { x: -1, y: 1, z: 1 }, { x: 0, y: 2, z: 1 }, { x: 0, y: 1, z: 0 }, { x: -1, y: 0, z: 0 }))}
                {drawPath(transX2, transY2, new Path({ x: 0, y: 2, z: 1 }, { x: -1, y: 0, z: 0 }, { x: -1, y: 1, z: 1 }, { x: -3, y: 0, z: -1 }, { x: 0, y: 2, z: 1 }, { x: -1, y: 1, z: 1 }))}

                {drawEntity(transX2, transY2, new Intersection({ x: -3, y: 0, z: -1 }, { x: 0, y: 2, z: 1 }, { x: -1, y: 1, z: 1 }), settlementRed)}
                {drawEntity(transX2, transY2, new Intersection({ x: 0, y: 2, z: 1 }, { x: 0, y: 1, z: 0 }, { x: -1, y: 0, z: 0 }), cityRed)}
                {drawEntity(transX2, transY2, new Intersection({ x: -1, y: 0, z: -2 }, { x: 0, y: 1, z: 0 }, { x: 1, y: 3, z: 1 }), settlementRed)}
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

const getTranslationStyle = (transX: number, transY: number, coord: HexCoordinate, angle?: number) => {
    const displacement = hexToCartesianPointyUp(coord);
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
                <img className={"port-pier__image1"} src={portPier} />
                <img className={"port-pier__image2"} src={portPier} />
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

const drawPath = (transX: number, transY: number, path: Path) => {
    const start = findCenter(path.start1, path.start2, path.start3);
    const end = findCenter(path.end1, path.end2, path.end3);
    const center = findCenter2c(start, end);

    const cartesianStart = hexToCartesianPointyUp(start);
    const cartesianEnd = hexToCartesianPointyUp(end);
    const deltaX = cartesianEnd.x - cartesianStart.x;
    const deltaY = cartesianEnd.y - cartesianStart.y;
    const angle = Math.atan(deltaY / deltaX) + Math.PI / 2;

    const style = getTranslationStyle(transX, transY, center, angle);

    const id = `path-(${center.x},${center.y},${center.z})`;

    return (
        <div className="path-road" id={id} style={style}>
            <img className="path-road__image" src={roadRed} />
        </div>
    );
};
