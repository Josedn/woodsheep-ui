import type { GameStateTile } from "../GameService";
import { findCenter, type HexCoordinate } from "./Tile";

/**
 * Offsets (relative to a tile's own cube coordinate) of the two neighboring tiles that,
 * together with the tile itself, meet at each NodeRef corner. Mirrors the backend's
 * Coordinate.UNIT_VECTORS / TileInitializer geometry so ids line up visually.
 */
const NODE_REF_OFFSETS: Record<string, [HexCoordinate, HexCoordinate]> = {
    NORTH: [
        { x: 0, y: 1, z: -1 },
        { x: 1, y: 0, z: -1 },
    ],
    NORTHEAST: [
        { x: 1, y: -1, z: 0 },
        { x: 1, y: 0, z: -1 },
    ],
    SOUTHEAST: [
        { x: 1, y: -1, z: 0 },
        { x: 0, y: -1, z: 1 },
    ],
    SOUTH: [
        { x: 0, y: -1, z: 1 },
        { x: -1, y: 0, z: 1 },
    ],
    SOUTHWEST: [
        { x: -1, y: 0, z: 1 },
        { x: -1, y: 1, z: 0 },
    ],
    NORTHWEST: [
        { x: -1, y: 1, z: 0 },
        { x: 0, y: 1, z: -1 },
    ],
};

/** Which two NodeRef corners each EdgeRef connects, mirroring the backend's EDGE_NODES table. */
const EDGE_NODE_REFS: [string, string][] = [
    ["NORTHEAST", "SOUTHEAST"], // EAST
    ["SOUTHEAST", "SOUTH"], // SOUTHEAST
    ["SOUTH", "SOUTHWEST"], // SOUTHWEST
    ["SOUTHWEST", "NORTHWEST"], // WEST
    ["NORTHWEST", "NORTH"], // NORTHWEST
    ["NORTH", "NORTHEAST"], // NORTHEAST
];

const addCoord = (a: HexCoordinate, b: HexCoordinate): HexCoordinate => ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z });

export const nodeCenterCoordinate = (tileCoord: HexCoordinate, nodeRef: string): HexCoordinate => {
    const [off1, off2] = NODE_REF_OFFSETS[nodeRef];
    return findCenter(tileCoord, addCoord(tileCoord, off1), addCoord(tileCoord, off2));
};

export const edgeKey = (a: number, b: number): string => (a < b ? `${a}-${b}` : `${b}-${a}`);

/** nodeId -> its hex-coordinate position, derived purely from tile geometry (no backend edges needed). */
export const computeNodePositions = (tiles: GameStateTile[]): Map<number, HexCoordinate> => {
    const positions = new Map<number, HexCoordinate>();
    for (const tile of tiles) {
        const tileCoord: HexCoordinate = { x: tile.q, y: tile.r, z: tile.s };
        for (const [nodeRef, nodeId] of Object.entries(tile.nodes)) {
            if (!positions.has(nodeId)) {
                positions.set(nodeId, nodeCenterCoordinate(tileCoord, nodeRef));
            }
        }
    }
    return positions;
};

/** Every edge (as a deduplicated [nodeA, nodeB] pair) touching at least one land tile. */
export const computeAllEdges = (tiles: GameStateTile[]): [number, number][] => {
    const seen = new Set<string>();
    const edges: [number, number][] = [];
    for (const tile of tiles) {
        for (const [refA, refB] of EDGE_NODE_REFS) {
            const a = tile.nodes[refA];
            const b = tile.nodes[refB];
            if (a == null || b == null) continue;
            const key = edgeKey(a, b);
            if (!seen.has(key)) {
                seen.add(key);
                edges.push(a < b ? [a, b] : [b, a]);
            }
        }
    }
    return edges;
};

const NODE_REFS = ["NORTH", "NORTHEAST", "SOUTHEAST", "SOUTH", "SOUTHWEST", "NORTHWEST"];

/** Mirrors the backend's TileInitializer switch: which of *this* tile's node slots get borrowed
 * from which slot of the neighbor found in each direction. */
const BORROW_TABLE: Record<string, [string, string][]> = {
    EAST: [
        ["NORTHEAST", "NORTHWEST"],
        ["SOUTHEAST", "SOUTHWEST"],
    ],
    SOUTHEAST: [
        ["SOUTH", "NORTHWEST"],
        ["SOUTHEAST", "NORTH"],
    ],
    SOUTHWEST: [
        ["SOUTH", "NORTHEAST"],
        ["SOUTHWEST", "NORTH"],
    ],
    WEST: [
        ["NORTHWEST", "NORTHEAST"],
        ["SOUTHWEST", "SOUTHEAST"],
    ],
    NORTHWEST: [
        ["NORTH", "SOUTHEAST"],
        ["NORTHWEST", "SOUTH"],
    ],
    NORTHEAST: [
        ["NORTH", "SOUTHWEST"],
        ["NORTHEAST", "SOUTH"],
    ],
};

/** Cube-coordinate offset of the neighbor found in each of the 6 hex directions, mirroring the
 * backend's Coordinate.UNIT_VECTORS. */
export const DIRECTION_OFFSETS: Record<string, HexCoordinate> = {
    EAST: { x: 1, y: -1, z: 0 },
    SOUTHEAST: { x: 0, y: -1, z: 1 },
    SOUTHWEST: { x: -1, y: 0, z: 1 },
    WEST: { x: -1, y: 1, z: 0 },
    NORTHWEST: { x: 0, y: 1, z: -1 },
    NORTHEAST: { x: 1, y: 0, z: -1 },
};

/** Which 2 of a port's own 6 node slots are the actual pier nodes, keyed by the port's facing
 * direction — mirrors the backend's TileInitializer.PORT_DIRECTION_TO_NODEREFS exactly. */
export const PORT_DIRECTION_NODE_REFS: Record<string, [string, string]> = {
    WEST: ["NORTHWEST", "SOUTHWEST"],
    NORTHWEST: ["NORTH", "NORTHWEST"],
    NORTHEAST: ["NORTHEAST", "NORTH"],
    EAST: ["SOUTHEAST", "NORTHEAST"],
    SOUTHEAST: ["SOUTH", "SOUTHEAST"],
    SOUTHWEST: ["SOUTHWEST", "SOUTH"],
};

/**
 * Invents node ids for a hand-authored tile list purely from cube-coordinate adjacency, mirroring
 * the backend's TileInitializer borrow-or-allocate scheme so shared corners get the same id. Only
 * needed for mock/offline data — real game state always carries backend-assigned ids already.
 */
export const assignNodeIds = (tiles: { id: number; q: number; r: number; s: number }[]): Map<number, Record<string, number>> => {
    const coordKey = (c: HexCoordinate) => `${c.x},${c.y},${c.z}`;
    const byCoord = new Map<string, number>();
    for (const t of tiles) byCoord.set(coordKey({ x: t.q, y: t.r, z: t.s }), t.id);

    const nodesByTile = new Map<number, Record<string, number>>();
    let nextId = 0;

    for (const t of tiles) {
        const coord: HexCoordinate = { x: t.q, y: t.r, z: t.s };
        const nodes: Partial<Record<string, number>> = {};

        for (const [direction, offset] of Object.entries(DIRECTION_OFFSETS)) {
            const neighborId = byCoord.get(coordKey(addCoord(coord, offset)));
            if (neighborId == null) continue;
            const neighborNodes = nodesByTile.get(neighborId);
            if (!neighborNodes) continue;
            for (const [selfSlot, neighborSlot] of BORROW_TABLE[direction]) {
                const value = neighborNodes[neighborSlot];
                if (value != null) nodes[selfSlot] = value;
            }
        }

        for (const ref of NODE_REFS) {
            if (nodes[ref] == null) nodes[ref] = nextId++;
        }

        nodesByTile.set(t.id, nodes as Record<string, number>);
    }

    return nodesByTile;
};
