import { Tile, TileType, degToRad, findCenter, findCenter2c, type CartesianCoordinate, type HexCoordinate } from "../engine/Tile";
import { Path } from "../engine/Path";
import { Intersection } from "../engine/Intersection";
import { GAME_ICONS, GAME_TINTED_ICONS } from "../assets/images";
import "./game-board.scss";

const HEX_SCALE = 10 * Math.cos(degToRad(30)) * 0.99; // 10em * hex width / height * arbitrary adjustment

export const GameBoard = () => {
    const transX2 = 40;
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

                <TileShore transX={transX2} transY={transY2} degreesRotation={120} sprite={GAME_ICONS.tileShore2} coord={{ x: -1, y: 1, z: -2 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={120} sprite={GAME_ICONS.tileShore1} coord={{ x: -2, y: 1, z: -2 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={60} sprite={GAME_ICONS.tileShore2} coord={{ x: -2, y: 1, z: -1 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={60} sprite={GAME_ICONS.tileShore2} coord={{ x: -3, y: 0, z: -1 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={60} sprite={GAME_ICONS.tileShore1} coord={{ x: -4, y: -1, z: -1 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={0} sprite={GAME_ICONS.tileShore2} coord={{ x: -4, y: -2, z: -1 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={0} sprite={GAME_ICONS.tileShore2} coord={{ x: -4, y: -3, z: -1 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={0} sprite={GAME_ICONS.tileShore1} coord={{ x: -4, y: -4, z: -1 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={300} sprite={GAME_ICONS.tileShore2} coord={{ x: -3, y: -4, z: -1 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={300} sprite={GAME_ICONS.tileShore2} coord={{ x: -2, y: -4, z: -1 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={300} sprite={GAME_ICONS.tileShore1} coord={{ x: -1, y: -4, z: -1 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={240} sprite={GAME_ICONS.tileShore2} coord={{ x: -0, y: -3, z: -1 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={240} sprite={GAME_ICONS.tileShore2} coord={{ x: 1, y: -2, z: -1 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={240} sprite={GAME_ICONS.tileShore1} coord={{ x: 2, y: -1, z: -1 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={180} sprite={GAME_ICONS.tileShore2} coord={{ x: 2, y: 0, z: -1 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={180} sprite={GAME_ICONS.tileShore2} coord={{ x: 2, y: 1, z: -1 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={180} sprite={GAME_ICONS.tileShore1} coord={{ x: 2, y: 2, z: -1 }} />
                <TileShore transX={transX2} transY={transY2} degreesRotation={120} sprite={GAME_ICONS.tileShore2} coord={{ x: 1, y: 2, z: -1 }} />

                <PortPier transX={transX2} transY={transY2} coord={{ x: -2, y: 1, z: -2 }} angle={0} sprite={GAME_ICONS.portLumber} />
                <PortPier transX={transX2} transY={transY2} coord={{ x: -3, y: 0, z: -1 }} angle={300} sprite={GAME_ICONS.port} />
                <PortPier transX={transX2} transY={transY2} coord={{ x: -4, y: -2, z: -1 }} angle={300} sprite={GAME_ICONS.portBrick} />
                <PortPier transX={transX2} transY={transY2} coord={{ x: -4, y: -4, z: -1 }} angle={240} sprite={GAME_ICONS.port} />
                <PortPier transX={transX2} transY={transY2} coord={{ x: -2, y: -4, z: -1 }} angle={180} sprite={GAME_ICONS.portGrain} />
                <PortPier transX={transX2} transY={transY2} coord={{ x: -0, y: -3, z: -1 }} angle={180} sprite={GAME_ICONS.port} />
                <PortPier transX={transX2} transY={transY2} coord={{ x: 2, y: -1, z: -1 }} angle={120} sprite={GAME_ICONS.portWool} />
                <PortPier transX={transX2} transY={transY2} coord={{ x: 2, y: 1, z: -1 }} angle={60} sprite={GAME_ICONS.port} />
                <PortPier transX={transX2} transY={transY2} coord={{ x: 1, y: 2, z: -1 }} angle={60} sprite={GAME_ICONS.portOre} />

                {drawPath(transX2, transY2, new Path({ x: 0, y: 2, z: 1 }, { x: 0, y: 1, z: 0 }, { x: 1, y: 3, z: 1 }, { x: -1, y: 0, z: -2 }, { x: 0, y: 1, z: 0 }, { x: 1, y: 3, z: 1 }), GAME_TINTED_ICONS.roadBlue)}
                {drawPath(transX2, transY2, new Path({ x: 0, y: 2, z: 1 }, { x: 0, y: 1, z: 0 }, { x: 1, y: 3, z: 1 }, { x: 0, y: 2, z: 1 }, { x: 0, y: 1, z: 0 }, { x: -1, y: 0, z: 0 }), GAME_TINTED_ICONS.roadBlue)}
                {drawPath(transX2, transY2, new Path({ x: 0, y: 2, z: 1 }, { x: -1, y: 0, z: 0 }, { x: -1, y: 1, z: 1 }, { x: 0, y: 2, z: 1 }, { x: 0, y: 1, z: 0 }, { x: -1, y: 0, z: 0 }), GAME_TINTED_ICONS.roadRed)}
                {drawPath(transX2, transY2, new Path({ x: 0, y: 2, z: 1 }, { x: -1, y: 0, z: 0 }, { x: -1, y: 1, z: 1 }, { x: -3, y: 0, z: -1 }, { x: 0, y: 2, z: 1 }, { x: -1, y: 1, z: 1 }), GAME_TINTED_ICONS.roadRed)}

                {drawEntity(transX2, transY2, new Intersection({ x: -3, y: 0, z: -1 }, { x: 0, y: 2, z: 1 }, { x: -1, y: 1, z: 1 }), GAME_TINTED_ICONS.settlementRed)}
                {drawEntity(transX2, transY2, new Intersection({ x: 0, y: 2, z: 1 }, { x: 0, y: 1, z: 0 }, { x: -1, y: 0, z: 0 }), GAME_TINTED_ICONS.cityRed)}
                {drawEntity(transX2, transY2, new Intersection({ x: -1, y: 0, z: -2 }, { x: 0, y: 1, z: 0 }, { x: 1, y: 3, z: 1 }), GAME_TINTED_ICONS.settlementBlue)}
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

    const cartesianStart = hexToCartesianPointyUp(start);
    const cartesianEnd = hexToCartesianPointyUp(end);
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
