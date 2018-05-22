import { RectPositionable, RectRenderable } from '@sectjs/basics';
import { LinearCollidable } from '@sectjs/collision';
import { Entity, EntityBinder } from '@sectjs/core';

const createEdge = (bindEntity: EntityBinder, y: number, width: number, height: number) => {
    const positionable = new RectPositionable(0, y, width, height); // TODO: world space, real coords
    const rectRenderable = new RectRenderable(positionable, 'black');
    const linearCollidable = new LinearCollidable('edge', positionable);

    return bindEntity(new Entity(positionable, linearCollidable, rectRenderable));
};

export default createEdge;
