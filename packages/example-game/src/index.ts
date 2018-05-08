import { Positionable, RectRenderable, RectRenderSystem } from '@tecs/basics';
import { createEntityBinder, Entity, Game, SystemRegistry } from '@tecs/core';
import { KeyboardInteractable } from '@tecs/input';
import Moveable from './movement/Moveable';
import MovementSystem from './movement/MovementSystem';

const canvas = document.body.querySelector('#game-output') as HTMLCanvasElement;
const context = canvas.getContext('2d');

const clearContext = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
};

const systemRegistry = new SystemRegistry([
    [Moveable, new MovementSystem()],
    [RectRenderable, new RectRenderSystem(context)],
]);

const bindEntity = createEntityBinder(systemRegistry);

const createPaddle = () => {
    const positionable = new Positionable(20, 20, 50, 10); // TODO: world space, real coords
    const moveable = new Moveable(5, 0, positionable, KeyboardInteractable.create()); // TODO: .create() for all comps?
    const rectRenderable = new RectRenderable(positionable, 'black');

    return new Entity(moveable, positionable, rectRenderable);
};

const paddle = bindEntity(createPaddle());
const game = new Game(systemRegistry);

game.onLoopStart(clearContext);

game.setState<number>('score', 0);
game.start();
