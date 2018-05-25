import { RectPositionable } from '@sectjs/basics';
import { createComponentBinder, Game, Component } from '@sectjs/core';
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

const findComponent = <T extends Component>(components: Component[], TargetConstructor: new (...args) => T) => (
    components.find(c => c.constructor === TargetConstructor) as T
);

const systemRegistry = createSystemRegistry(context);
const game = new Game(systemRegistry);

game.setState<number>('playerScore', () => 0);
game.setState<number>('computerScore', () => 0);

const bindComponents = createComponentBinder(systemRegistry);
const ball = createBall(bindComponents, game);
const paddle = createPlayerPaddle(bindComponents);
const computerPaddle = createComputerPaddle(bindComponents, findComponent<RectPositionable>(ball, RectPositionable));
const topEdge = createEdge(bindComponents, 0, canvas.width, EDGE_HEIGHT);
const bottomEdge = createEdge(bindComponents, canvas.height - EDGE_HEIGHT, canvas.width, EDGE_HEIGHT);
const playerGoal = createGoal(bindComponents, 'playerGoal', 0, canvas.height);
const computerGoal = createGoal(bindComponents, 'computerGoal', canvas.width - 0.01, canvas.height);
const hud = createHud(bindComponents, game);

game.onLoopStart(clearContext);
game.start();
