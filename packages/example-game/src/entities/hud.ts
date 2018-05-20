import { RectPositionable, RectRenderable, TextRenderable } from '@sectjs/basics';
import { Entity, EntityBinder, Game } from '@sectjs/core';

const createHud = (bindEntity: EntityBinder, game: Game) => {
    const positionable = new RectPositionable(20, 20, 0, 0); // TODO: positionable without width and height
    const textRenderable = new TextRenderable('Hud here', 'Arial', 20, positionable, 'black'); // TODO: separate size
    const entity = new Entity(positionable, textRenderable);

    return bindEntity(entity);
};

export default createHud;
