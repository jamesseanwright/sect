import ConstantMovementSystem from './movement/ConstantMovementSystem'; // TODO: move below bare imports
import { RectPositionable, RectRenderable, RectRenderSystem, TextRenderable, TextRenderSystem } from '@sectjs/basics';
import { createEntityBinder, Entity, Game, SystemRegistry } from '@sectjs/core';
import { KeyboardInteractable } from '@sectjs/input';
import KeyboardMoveable from './movement/KeyboardMoveable';
import MovementSystem from './movement/MovementSystem';
import Moveable from './movement/Moveable';
import ConstantMoveable from './movement/ConstantMoveable';
import { hasRectangularCollision, LinearCollidable, LinearCollisionSystem } from '@sectjs/collision';
import TrackingMoveable from './movement/TrackingMoveable';
import TrackingMovementSystem from './movement/TrackingMovementSystem';
import Bounceable from './physics/Bounceable';
import BounceSystem from './physics/BounceSystem';
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

const systemRegistry = new SystemRegistry([
    [KeyboardMoveable, new MovementSystem()],
    [RectRenderable, new RectRenderSystem(context)],
    [TextRenderable, new TextRenderSystem(context)],
    [ConstantMoveable, new ConstantMovementSystem()],
    [TrackingMoveable, new TrackingMovementSystem()],
    [LinearCollidable, new LinearCollisionSystem(hasRectangularCollision)],
    [Bounceable, new BounceSystem()],
]);

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
