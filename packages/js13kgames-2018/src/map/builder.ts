import createRoad from '../entities/road';
import { Component, ComponentBinder } from '@sectjs/core';
import createSolidTile from '../entities/solidTile';
import { Tile } from './map';

export type TileBuilder = (binder: ComponentBinder, x: number, y: number, rotation: number) => void;

const TILE_SIZE = 24;

const tileBuilders = new Map<string, TileBuilder>([
    ['R', (binder, x, y, rotation) => createRoad(binder, x, y, TILE_SIZE, rotation)],
    ['T', (binder, x, y, rotation) => createRoad(binder, x, y, TILE_SIZE, rotation, 'ThreeWay')],
    ['C', (binder, x, y, rotation) => createRoad(binder, x, y, TILE_SIZE, rotation, 'Corner')],
    ['X', (binder, x, y) => createRoad(binder, x, y, TILE_SIZE, 0, 'Cross')],
    ['G', (binder, x, y) => createSolidTile(binder, x, y, TILE_SIZE, 'grass')],
    ['E', (binder, x, y) => createSolidTile(binder, x, y, TILE_SIZE, 'exchange')],
]);

// const findBuilder

const buildMap = (rows: Tile[][]) => (
    rows.map((row, y) => (
        row.map((tile, x) => (

        ))
    ))
);
