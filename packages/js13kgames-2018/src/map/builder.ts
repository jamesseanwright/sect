import createRoad from '../entities/road';
import { Component, ComponentBinder } from '@sectjs/core';
import createSolidTile from '../entities/solidTile';
import { Tile } from './map';

export type TileBuilder = (binder: ComponentBinder, x: number, y: number, rotation: number) => void;

const TILE_SIZE = 0.032229;
const ROTATION_INCREMENT_RADIANS = 1.5708;

const tileBuilders = new Map<string, TileBuilder>([
    ['R', (binder, x, y, rotation) => createRoad(binder, x, y, TILE_SIZE, rotation)],
    ['T', (binder, x, y, rotation) => createRoad(binder, x, y, TILE_SIZE, rotation, 'ThreeWay')],
    ['C', (binder, x, y, rotation) => createRoad(binder, x, y, TILE_SIZE, rotation, 'Corner')],
    ['X', (binder, x, y) => createRoad(binder, x, y, TILE_SIZE, 0, 'Cross')],
    ['G', (binder, x, y) => createSolidTile(binder, x, y, TILE_SIZE, 'grass')],
    ['E', (binder, x, y) => createSolidTile(binder, x, y, TILE_SIZE, 'exchange')],
]);

const getRotation = (tile: Tile) => {
    const [, , rotation = '0'] = tile;
    return parseInt(rotation, 10) * ROTATION_INCREMENT_RADIANS;
};

const buildMap = (componentBinder: ComponentBinder, rows: Tile[][]) => {
    rows.forEach((row, y) => {
        row.forEach((tile, x) => {
            const [tileType] = tile;
            tileBuilders.get(tileType)(componentBinder, x * TILE_SIZE, y * TILE_SIZE, getRotation(tile));
        });
    });
};

export default buildMap;
