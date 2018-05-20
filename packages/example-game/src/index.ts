import { RectPositionable } from '@sectjs/basics';
import { createEntityBinder, Entity, Game } from '@sectjs/core';
import createSystemRegistry from './systemRegistry';
import createBall from './entities/ball';
import createComputerPaddle from './entities/computerPaddle';
import createEdge from './entities/edge';
import createHud from './entities/hud';
import createPlayerPaddle from './entities/playerPaddle';

const EDGE_HEIGHT = 5;

const canvas = document.body.querySelector('#game-output') as HTMLCanvasElement;
const context = canvas.getContext('2d');

const clearContext = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
};

const systemRegistry = createSystemRegistry(context);
const game = new Game(systemRegistry);
const bindEntity = createEntityBinder(systemRegistry);

const ball = createBall(bindEntity);
const paddle = createPlayerPaddle(bindEntity);
const computerTarget = ball.getComponentByType<RectPositionable>(RectPositionable);
const computerPaddle = createComputerPaddle(bindEntity, computerTarget);
const topEdge = createEdge(bindEntity, 0, canvas.width, EDGE_HEIGHT);
const bottomEdge = createEdge(bindEntity, canvas.height - EDGE_HEIGHT, canvas.width, EDGE_HEIGHT);
const hud = createHud(bindEntity, game);

game.onLoopStart(clearContext);

game.setState<number>('score', 0);
game.start();
