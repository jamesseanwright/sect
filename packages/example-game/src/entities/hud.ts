import { RectPositionable, RectRenderable, TextRenderable } from '@tecs/basics';
import { Entity, EntityBinder, Game } from '@tecs/core';

const createHud = (bindEntity: EntityBinder, game: Game) => {
    const positionable = new RectPositionable(20, 20, 0, 0); // TODO: positionable without width and height
    const textRenderable = new TextRenderable('Hud here', '20px Arial', positionable, 'black'); // TODO: separate size
    const entity = new Entity(positionable, textRenderable);

    return bindEntity(entity);
};

export default createHud;
