import { createComponentBinder, Game, Component } from '@sectjs/core';
import createSystemRegistry from './systemRegistry';
import buildMap from './map/builder';
import map from './map/map';

const canvas = document.body.querySelector<HTMLCanvasElement>('#game-output');
const context = canvas.getContext('2d');

const clearContext = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
};

const systemRegistry = createSystemRegistry(context);
const game = new Game(systemRegistry);

game.setState<number>('playerScore', () => 0);

const bindComponents = createComponentBinder(systemRegistry);

buildMap(bindComponents, map);

game.onLoopStart(clearContext);
game.start();
