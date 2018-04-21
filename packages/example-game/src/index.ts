import { Positionable, RectRenderable, RectRenderSystem } from '@tecs/basics';
import { createEntityBinder, Entity, Game, SystemRegistry } from '@tecs/core';

const canvas = document.body.querySelector('#game-output') as HTMLCanvasElement;
const context = canvas.getContext('2d');

const systemRegistry = new SystemRegistry([
    [RectRenderable, new RectRenderSystem(context)],
]); // TODO: fix [default] typings

const bindEntity = createEntityBinder(systemRegistry);

const createPaddle = () => {
    const positionable = new Positionable(20, 20, 50, 10); // TODO: world space, real coords
    const rectRenderable = new RectRenderable(positionable, 'white');

    return new Entity(positionable, rectRenderable);
};

const paddle = bindEntity(createPaddle());
const game = new Game(systemRegistry);

game.setState<number>('score', 0);
game.start();
