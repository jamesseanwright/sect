import { RectPositionable } from '@sectjs/basics';
import { createEntityBinder, Entity, Game } from '@sectjs/core';
import createSystemRegistry from './systemRegistry';
import createBall from './entities/ball';
import createComputerPaddle from './entities/computerPaddle';
import createEdge from './entities/edge';
import createGoal from './entities/goal';
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

game.setState<number>('playerScore', () => 0);
game.setState<number>('computerScore', () => 0);

const bindEntity = createEntityBinder(systemRegistry);
const ball = createBall(bindEntity, game);
const paddle = createPlayerPaddle(bindEntity);
const computerPaddle = createComputerPaddle(bindEntity, ball);
const topEdge = createEdge(bindEntity, 0, canvas.width, EDGE_HEIGHT);
const bottomEdge = createEdge(bindEntity, canvas.height - EDGE_HEIGHT, canvas.width, EDGE_HEIGHT);
const playerGoal = createGoal(bindEntity, 'playerGoal', 0, canvas.height);
const computerGoal = createGoal(bindEntity, 'computerGoal', canvas.width - 0.01, canvas.height);
const hud = createHud(bindEntity, game);

game.onLoopStart(clearContext);
game.start();
