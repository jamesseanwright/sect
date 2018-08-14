import createRoad from '../entities/road';
import { Component, ComponentBinder } from '@sectjs/core';
import createSolidTile from '../entities/solidTile';
import { Tile } from './map';

export type TileBuilder = (binder: ComponentBinder, x: number, y: number, rotation: number) => void;

const TILE_SIZE = 24; // TODO: world space

const tileBuilders = new Map<string, TileBuilder>([
    ['R', (binder, x, y, rotation) => createRoad(binder, x, y, TILE_SIZE, rotation)],
    ['T', (binder, x, y, rotation) => createRoad(binder, x, y, TILE_SIZE, rotation, 'ThreeWay')],
    ['C', (binder, x, y, rotation) => createRoad(binder, x, y, TILE_SIZE, rotation, 'Corner')],
    ['X', (binder, x, y) => createRoad(binder, x, y, TILE_SIZE, 0, 'Cross')],
    ['G', (binder, x, y) => createSolidTile(binder, x, y, TILE_SIZE, 'grass')],
    ['E', (binder, x, y) => createSolidTile(binder, x, y, TILE_SIZE, 'exchange')],
]);

const parseRotation = (tile: Tile) => {
    const [, , rotation = '0'] = tile;
    return parseInt(rotation, 10);
};

const buildMap = (componentBinder: ComponentBinder, rows: Tile[][]) => {
    rows.forEach((row, y) => {
        row.forEach((tile, x) => {
            const [tileType] = tile;
            tileBuilders.get(tileType)(componentBinder, x * TILE_SIZE, y * TILE_SIZE, parseRotation(tile));
        });
    });
};

export default buildMap;
