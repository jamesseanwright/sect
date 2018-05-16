import { RectPositionable, RectRenderable, RectRenderSystem } from '@tecs/basics';
import { hasRectangularCollision, LinearCollidable, LinearCollisionSystem } from '@tecs/collision';
import { createEntityBinder, Entity, Game, SystemRegistry } from '@tecs/core';
import { KeyboardInteractable } from '@tecs/input';
import KeyboardMoveable from './movement/KeyboardMoveable';
import MovementSystem from './movement/MovementSystem';
import Moveable from './movement/Moveable';
import createBall from './entities/ball';
import createComputerPaddle from './entities/computerPaddle';
import createPlayerPaddle from './entities/playerPaddle';

const canvas = document.body.querySelector('#game-output') as HTMLCanvasElement;
const context = canvas.getContext('2d');

const clearContext = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
};

const systemRegistry = new SystemRegistry([
    [KeyboardMoveable, new MovementSystem()],
    [RectRenderable, new RectRenderSystem(context)],
    [LinearCollidable, new LinearCollisionSystem(hasRectangularCollision)],
]);

const bindEntity = createEntityBinder(systemRegistry);

const ball = createBall(bindEntity);
const paddle = createPlayerPaddle(bindEntity);
const computerPaddle = createComputerPaddle(bindEntity);
const game = new Game(systemRegistry);

game.onLoopStart(clearContext);

game.setState<number>('score', 0);
game.start();
